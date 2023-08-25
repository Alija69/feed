// const httpStatus = require('http-status');
// const passport = require('passport');
// const Users = require('../services/user/user.model');
// const APIError = require('../utils/APIError');
// const jwtDecode = require('jwt-decode');
// const sequelize = require('../../config/sequelize');
// const Sequelize = require('sequelize');

// const handleJWT = (req, res, next) => async (err, user, info) => {
//   let authHeader = req.header('Authorization');
//   const date = new Date() / 1000;
//   if (authHeader) {
//     let sessionID = authHeader.split(' ')[1];
//     if (sessionID) {
//       try {
//         let userData = jwtDecode(sessionID);
//         let dt = parseInt(date.toString().split('.')[0]);
//         if (userData.exp > dt) {
//           req.user = true;
//           req.user_id = userData.user_id;
//           req.user_role = userData.role;
//           const client_admin = await sequelize.query(
//             `select is_client_admin from users where id = ${req.user_id};`,
//             { type: Sequelize.QueryTypes.SELECT }
//           );
//           req.clientAdmin =
//             client_admin.length > 0 ? client_admin[0].is_client_admin : false;
//           const membership = await sequelize.query(
//             `select plan from user_memberships where user_id = ${req.user_id} and expiry > now() order by id desc limit 1;`,
//             { type: Sequelize.QueryTypes.SELECT }
//           );
//           req.user_membership =
//             membership.length > 0 ? membership[0].plan : null;
//           return next();
//         } else {
//           const error = err || info;
//           const logIn = Promise.promisify(req.logIn);

//           const apiError = new APIError({
//             message: error ? error.message : 'Unauthorized',
//             status: httpStatus.UNAUTHORIZED,
//             stack: error ? error.stack : undefined,
//           });
//           return next(apiError);
//         }
//       } catch (e) {
//         const error = err || info;
//         const logIn = Promise.promisify(req.logIn);

//         const apiError = new APIError({
//           message: error ? error.message : 'Unauthorized',
//           status: httpStatus.UNAUTHORIZED,
//           stack: error ? error.stack : undefined,
//         });
//         return next(apiError);
//       }
//     }
//   } else {
//     const error = err || info;
//     const logIn = Promise.promisify(req.logIn);

//     const apiError = new APIError({
//       message: error ? error.message : 'Unauthorized',
//       status: httpStatus.UNAUTHORIZED,
//       stack: error ? error.stack : undefined,
//     });

//     try {
//       if (error || !user) throw error;
//       await logIn(user, { session: false });
//     } catch (e) {
//       return next(apiError);
//     }

//     if (err || !user) {
//       return next(apiError);
//     }
//   }
// };

// exports.authorize = () => (req, res, next) =>
//   passport.authenticate('jwt', { session: false }, handleJWT(req, res, next))(
//     req,
//     res,
//     next
//   );
