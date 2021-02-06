/**
 * @author Arvind Kalra <kalarvind97@gmail.com>
 * @profile https://github.com/arvindkalra
 * @date 07/02/21
 */
const _ = require('lodash');
const sdk = require('./sdk');

module.exports = function (sails) {
    return {
        defaults: {
            __configKey__: {
                api: {}
            }
        },
        configure: function () {
            const config = _.get(sails, ['config', this.configKey, 'api'], {});

            sails.request = new sdk(config, sails);
        }
    }
}
