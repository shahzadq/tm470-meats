import controllers from '@tm470-meats/server/controllers';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelBusiness } from '../../models/business.interfaces';
import { IApiModelSecurity } from '../../models/security.interfaces';
import { businessNameTakenError } from './business.errors';

async function create(
  req: NextApiRequest,
  res: NextApiResponse,
  security: IApiModelSecurity,
  next?: NextApiHandler
) {
  const business: IApiModelBusiness = await database.business.create({
    name: req.body.name.toLowerCase(),
    securityId: security._id,
    address: {
      number: req.body.address.number,
      street: req.body.address.street,
      city: req.body.address.city,
      postcode: req.body.address.postcode,
    },
    phone: req.body.phone,
  });
  return next ? next(req, res) : res.status(200).json(business);
}

export async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  next?: NextApiHandler
) {
  try {
    const { id } = req.query;

    const security: IApiModelSecurity = await database.security.findOne({
      $or: [{ email: req.body.email }, { _id: id }],
    });
    const businesses: IApiModelBusiness[] = await database.business.find({
      securityId: security._id,
    });

    if (businesses.length > 0) {
      // there are some business accounts.
      const nameMatch: Array<boolean> = await businesses.map(
        (business: IApiModelBusiness) => {
          if (business.name === req.body.name.toLowerCase()) {
            return true;
          }
          return false;
        }
      );

      if (!nameMatch.includes(true)) {
        // the name is available
        return create(req, res, security, next);
      } else {
        return businessNameTakenError(res);
      }
    } else {
      return create(req, res, security, next);
    }
  } catch (err) {
    return controllers.errors.codes[500](req, res);
  }
}
