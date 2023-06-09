const { CompanionShift, Companion } = require("../../db");

const getAllCompanionsPerShift = async (req, res) => {
  try {
    const shifts = await CompanionShift.findAll({
      include: {
        model: Companion,
        through: { attributes: [] },
      },
      order: [["id", "ASC"]], // Ordenar por ID de menor a mayor
    });

    const shiftsWithCount = shifts.map((shift) => ({
      shiftId: shift.id, // Incluir cualquier otro campo que necesites del turno
      day: shift.day,
      time: shift.time, 
      shiftCompanions: shift.Companions,
      companionCount: shift.Companions.length,
      maxCompanions: shift.maxCompanions,
      hasRules: shift.hasRules,
    }));
     res.status(200).json( shiftsWithCount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getAllCompanionsPerShift;
