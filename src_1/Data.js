const fetchData = async () => {
  const Url = 'http://127.0.0.1:8086'
  try {
    const response_elements = await fetch(Url + '/api/load-instrument');
    data.initProducts = [await response_elements.json()];

    const response_users = await fetch(Url + '/api/load-users');
    data.users = [await response_users.json()];
    console.log(data)

    const response_cats = await fetch(Url + '/api/read-categorie');
    data.categories = [await response_cats.json()];
    console.log(data)

    return data;
  } catch (error) {
    console.error('Error fetching data from API Elements:', error);
    return [];
  }
};

const data = {
  users: [
    
  ],
  initProducts: [
    
  ],
  categories : [

  ],
};



export {data, fetchData};