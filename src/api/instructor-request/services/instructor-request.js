'use strict';

/**
 * instructor-request service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::instructor-request.instructor-request');
