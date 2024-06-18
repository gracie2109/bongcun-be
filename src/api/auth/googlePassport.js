import 'dotenv/config'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import UserModel from '../models/user.model'

/**
 * @param options @interface StrategyOptionsWithRequest
 */
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
            passReqToCallback: true
        },
        function (req, accessToken, refreshToken, profile, done) {
            UserModel.findOne({ email: profile.email }).exec((err, user) => {
                if (err) {
                    return done(err, false)
                }
                if (!user) {
                    return done(null, false)
                }

                const displayPicture = user?.picture || profile.picture
                return done(null, { ...user?.toObject(), picture: displayPicture })
            })
        }
)
)

passport.serializeUser((user, done) => done(null, user))

passport.deserializeUser((user, done) => done(null, user))
