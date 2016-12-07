'use strict';

module.exports = class IPAddress {

  constructor(address) {
    this.address = address;
  }

  getHypernetSequences() {
    var regex = /\[\w*\]/g;
    return this.address.match(regex);
  }

  getNormalSequences() {
    var regex = /\[\w*\]/g;
    return this.address.split(regex);
  }

  supportsTls() {
    // lets check if there are any abba sequences in the non hypernet sections
    const existsAbba = this.getNormalSequences().some((sequence) => {
      return this.containsAbba(sequence);
    });

    if (!existsAbba) {
      return false;
    }

    // if there is an abba, return true if there are no abba codes in hypernet sequences
    const abbaInHypernet = this.getHypernetSequences().some((sequence) => {
      return this.containsAbba(sequence.slice(1, -1));
    });

    return !abbaInHypernet;
  }

  containsAbba(str) {
    // check if this contains an abba
    var i = 0;

    while (i <= str.length - 4) {
      if (str.charAt(i) === str.charAt(i + 3) &&
          str.charAt(i + 1) === str.charAt(i + 2) &&
          str.charAt(i) !== str.charAt(i + 1)) {
        return true;
      }

      i++;
    }

    return false;
  }
}