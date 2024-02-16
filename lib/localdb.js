const fs = require("fs")
const path= require('path')

module.exports = {
  init: function (storage, files) {
  this.storage = storage;
  this.files = files;

  if (!fs.existsSync(path.join(__dirname, "..", this.storage))) {
    fs.mkdirSync(path.join(__dirname, "..", this.storage), { recursive: true });
  }

  for (const filename of Object.keys(this.files)) {
    const obj = this.files[filename];
    const parts = obj.split('/');

    if (parts.length > 1) {
      const folder = parts.slice(0, -1).join('/');
      if (!fs.existsSync(path.join(__dirname, "..", this.storage, folder))) {
        fs.mkdirSync(path.join(__dirname, "..", this.storage, folder), { recursive: true });
      }
      if (!fs.existsSync(path.join(__dirname, "..", this.storage, folder, parts[parts.length - 1]))) {
        fs.writeFileSync(path.join(__dirname, "..", this.storage, folder, parts[parts.length - 1]), "[]", 'utf-8');
      }
    } else {
      if (!fs.existsSync(path.join(__dirname, "..", this.storage, obj))) {
        fs.writeFileSync(path.join(__dirname, "..", this.storage, obj), "[]", 'utf-8');
      }
    }
  }
},

  get: function (name, id, filename, log = false) {
  const file = this.files[filename];
  if (!file) {
    throw global.logs(`File ${filename} tidak ditemukan`, "error")
  }

  let data = fs.readFileSync(path.join(__dirname, "/../", `${this.storage}/${file}`), 'utf-8');
  let res = JSON.parse(data);

  let result;

  res.forEach(v => {
    if (!id) {
      result = v[name];
    } else {
      const found = v.id === id;
      if (found) {
        result = v[name];
      }
    }
  });
  log ? global.logs("value dari variable " + name + " adalah " + result, "info") : null
  return result;
},

  set: function (name, value, id, filename, log = false) {
  const file = this.files[filename];
  if (!file) {
    throw global.logs(`File ${filename} tidak ditemukan`, "error")
  }

  const filePath = path.join(__dirname, "/../", this.storage, file);
  let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const dataIndex = id ? data.findIndex(item => item.id === id) : -1;

  if (dataIndex !== -1 || id === null) {
    data.forEach(item => {
      if (id === null || item.id === id) {
        item[name] = value;
      }
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    log ? global.logs(`Nilai dari ${name} dengan ID ${id} telah diubah menjadi ${value}`, "info") : null
  } else {
    global.logs(`Objek dengan ID ${id} tidak ditemukan dalam array.`, "warn")
  }
},

  delete: function (name, id, filename, log = false) {
  const file = this.files[filename];
  if (!file) {
    throw global.logs(`File ${filename} tidak ditemukan`, "error")
  }

  const filePath = path.join(__dirname, "/../", this.storage, file);
  let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (id) {
    const dataIndex = data.findIndex(item => item.id === id);

    if (dataIndex !== -1) {
      delete data[dataIndex][name];
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      log ? global.logs(`Variabel ${name} dengan ID ${id} telah dihapus dari objek.`, "info") : null
    }
  } else {
    data.forEach(item => {
      delete item[name];
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    log ? global.logs(`Variabel ${name} telah dihapus dari semua objek.`, "info") : null
  }
},

  
  variables: function (variables, filename) {
  	if (!filename) {
    throw global.logs(`File ${filename} tidak ditemukan`, "error")
  }
    const filePath = path.join(__dirname, "/../", this.storage, this.files[filename]);
    try {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    let config;

    try {
      config = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError.message);
      return;
    }

    const foundIndex = config.findIndex((v) => v.id === variables.id);

    if (foundIndex === -1) {
      config.push(variables);
    }
    fs.writeFileSync(filePath, JSON.stringify(config), 'utf-8');
  }
} catch (readError) {
  global.logs('Error reading file:' + readError.message, "error");
}
},

 totalf: function (filename) {
  const filePath = path.join(__dirname, "..", this.storage, this.files[filename]);

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    try {
      const parsedData = JSON.parse(data);
      return Array.isArray(parsedData) ? parsedData.length : 0;
    } catch (error) {
      global.logs(`Error parsing JSON in file ${filename}: ${error.message}`, "error")
      return 0;
    }
  } else {
    return 0;
  }
},

 getDataUser: function(id, filename) {
 	if (!filename) {
    throw global.logs(`File ${filename} tidak ditemukan`, "error")
  }
  let result;
    const filePath = path.join(__dirname, "/../", this.storage, this.files[filename]);
   if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    const parsingData = JSON.parse(data)
    for (let i = 0; i < parsingData.length; i++) {
        if (parsingData[i].id === id) {
            return parsingData[i];
        }
    }
 }
 return "404"
},

find: function (name, id) {
    const databases = Object.entries(this.files);
    for (const [database, location] of databases) {
        const userData = this.getDataUser(id, database);
        if (userData && userData.hasOwnProperty(name)) {
            return database;
        }
    }
    return null;
}
}