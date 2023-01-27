 const getPagingData = (res, page, limit) => {
    const { count: total_data, rows: data } = res;
    const currentPage = page ? +page : 0;
    const total_page = Math.ceil(total_data / limit);
  
    return { total_data, data, total_page, currentPage };
  };

   const getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

  module.exports = {
    getPagingData,
    getPagination

}