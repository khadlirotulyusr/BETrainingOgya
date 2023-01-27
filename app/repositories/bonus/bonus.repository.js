function bonusRepository(db) {
    const getAllBonus = (condition, limit, offset) => {
         
        return db.bonusDB.findAndCountAll({
            attributes:['ENAME','JOB','SALE'],
            where : { ... condition},
            limit, 
            offset,
            raw: true,
//            plain: true,
        });
    }
    return {
        getAllBonus
    }

}
module.exports = bonusRepository