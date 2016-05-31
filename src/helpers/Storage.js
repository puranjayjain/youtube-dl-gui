// localstorage helper class

export default class Storage {
  // define the key to be used here for the data
  constructor(key, init) {
    this._key = key
      /**
       * [if the storage object is not already present then create it with the default value]
       * @param  {type} !this.dataExists [description]
       */
    if(!this.dataExists) {
      this.data = init
    }
  }

  /**
   * [dataExists check if the data exists or not in the localstorage]
   * @return {Boolean} [true or false]
   */
  get dataExists() {
    if(localStorage.getItem(this._key) === null) {
      return false
    } else {
      return true
    }
  }

  /**
   * [data getter for data]
   * @return {String} [data value from storage]
   */
  get data() {
    const _data = localStorage.getItem(this._key)
    let finalData = ''
    try {
      finalData = JSON.parse(_data)
    } catch(e) {
      finalData = _data
    } finally {
      return finalData
    }
  }

  /**
   * [data setter for data]
   * @param  {String} newdata [the new data to be updated]
   */
  set data(newdata) {
    localStorage.setItem(this._key, JSON.stringify(newdata))
  }

  /**
   * [toggleData toggle the value of key assuming it is boolean]
   */
  toggleData() {
    this.data = !this.data
  }
}
