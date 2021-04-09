export class Validation {
    constructor(objToValidate, validePredicate, errorTextPredicate) {
        this.objToValidate = objToValidate;
        this.validePredicate = validePredicate;
        this.errorTextPredicate = errorTextPredicate;
    }

    isValid() {
        return this.validePredicate(this.objToValidate);
    }

    getErrorText() {
        return this.errorTextPredicate(this.objToValidate);
    }
}