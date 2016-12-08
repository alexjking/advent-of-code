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

  supportsSSL() {
    // lets find all of the aba strings in the supernet sequences
    // and then convert them to bab codes
    const babCodes = this.getNormalSequences().map((sequence) => {
      return this.getAbaStrings(sequence);
    }).reduce((accumulator, seqeunceList) => {
      return accumulator.concat(seqeunceList);
    }, []).map((code) => {
      return this.convertAbaToBab(code);
    });

    // if there are no bab codes to find in the hypernet sequences, return early
    if (babCodes.length === 0) {
      return false;
    }

    return this.getHypernetSequences().some((sequence) => {
      return babCodes.some((babCode) => {
        if (sequence.indexOf(babCode) > -1) {
          return true;
        }
      });
    })
  }

  convertAbaToBab(str) {
    if (str.length !== 3) {
      return null;
    }

    const a = str.charAt(0);
    const b = str.charAt(1);

    return b + a + b;
  }

  getAbaStrings(str) {
     // check if this contains an abba
    var i = 0;

    var abaStrings = [];

    while (i <= str.length - 3) {
      if (str.charAt(i) === str.charAt(i + 2) &&
          str.charAt(i) !== str.charAt(i + 1)) {
        abaStrings.push(str.slice(i, i + 3));
      }

      i++;
    }

    return abaStrings;
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