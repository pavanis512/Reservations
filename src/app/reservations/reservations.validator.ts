import { NextFunction, Request, Response } from 'express';
const Joi = require('@hapi/joi');
const validationResponse = require('../../helper/validatorResponse');

const authSchema = {

 
  addReservation: Joi.object().options({ abortEarly: false, stripUnknown: true })
    .keys({
      body: Joi.object().keys({
        guestMemberId: Joi.number().required(),
        guestName: Joi.string().required(),
        hotelName: Joi.string().required(),
        arrivalDate: Joi.date().required(),
        departureDate: Joi.date().required(),
        stayAmount: Joi.number().required(),
        taxAmount: Joi.number().required(),
      })
    })
}

export default authSchema