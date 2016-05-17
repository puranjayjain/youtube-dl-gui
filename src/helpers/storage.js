// localstorage helper class

export default class Storage {
  // define the key to be used here for the data
  constructor(key, init) {
    this._key = key
    // if the storage object is not already present then create it with the default value
    if (!this.dataExists) {
      this.data = init
    }
  }

  get dataExists() {
    if (localStorage.getItem(this._key) === null) {
      return false
    }
    else {
      return true
    }
  }

  get data() {
    return localStorage.getItem(this._key)
  }

  set data(newdata) {
    if(newdata) {
      localStorage.setItem(this._key, newdata)
    }
  }
}
