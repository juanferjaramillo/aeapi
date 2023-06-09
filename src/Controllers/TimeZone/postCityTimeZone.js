const moment = require("moment-timezone");
const { CityTimeZone } = require("../../db");

const postCityTimeZone = async (req, res) => {
  try {
    const timeZones = moment.tz.names().map((zoneName) => {
      const offset = moment.tz(zoneName).utcOffset();
      const offsetString =
        "UTC" +
        (offset < 0 ? "-" : "+") +
        moment.utc().startOf("day").add(Math.abs(offset), "minutes").format("HH:mm");
      return {
        zoneName,
        offSet: offsetString,
      };
    });
    const cityTimeZone = await CityTimeZone.findAll();
    if (cityTimeZone.length === 0) {
      await CityTimeZone.bulkCreate(timeZones);
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = postCityTimeZone;
