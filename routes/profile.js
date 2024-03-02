'use strict';

const express = require('express');
const Profile = require('../schemas/profile');
const JCreateProfileSchema = require('../validations/profile');
const router = express.Router();

module.exports = function () {

  router.get('/:id', async function (req, res, next) {
    // find profile by id
    const profile = await Profile.findOne({ _id: req.params.id });
    if (profile) {
      res.render('profile_template', {
        profile: profile,
      });
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  });

  router.post('/profile', async function (req, res, next) {
    try {
      const { value, error } = JCreateProfileSchema.validate(req.body);

      if (error) {
        throw new Error(error);
      }

      const newProfile = new Profile(value);
      await newProfile.save();

      res.status(201).json(newProfile);
    } catch (error) {
      res.status(400).json({
        error_code: 'CREATE_PROFILE_FAILED',
        message: error.message
      });
    }
  });

  return router;
}

