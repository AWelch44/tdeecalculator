new Vue({
  el: '.tdee-calculator',
  data: {
    gender: '',
    age: '',
    weight: '',
    heightFt: '',
    heightIn: '',
    heightCm: '',
    activityLevel: '',
    weightUnit: 'lbs',
    heightUnit: 'in',
    tdee: null,
    loading: false
  },
  methods: {
    validateInputs() {
      if (!this.gender || !this.age || !this.weight || !this.activityLevel) {
        alert('Please fill in all required fields');
        return false;
      }

      if (this.heightUnit === 'cm' && !this.heightCm) {
        alert('Please enter your height');
        return false;
      }

      if (this.heightUnit === 'in' && (!this.heightFt || !this.heightIn)) {
        alert('Please enter your height');
        return false;
      }

      return true;
    },
    convertHeight() {
      let heightInCm;
      if (this.heightUnit === 'cm') {
        heightInCm = parseFloat(this.heightCm);
      } else {
        heightInCm = (parseFloat(this.heightFt) * 30.48) + (parseFloat(this.heightIn) * 2.54);
      }
      return heightInCm;
    },
    convertWeight() {
      return this.weightUnit === 'lbs' ? this.weight * 0.45359237 : this.weight;
    },
    calculateBMR(weightInKg, heightInCm) {
      if (this.gender === 'male') {
        return 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * this.age);
      } else {
        return 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * this.age);
      }
    },
    calculateTDEE() {
      if (!this.validateInputs()) {
        return;
      }

      this.loading = true;
      
      setTimeout(() => {
        try {
          const weightInKg = this.convertWeight();
          const heightInCm = this.convertHeight();

          if (isNaN(heightInCm) || isNaN(weightInKg)) {
            throw new Error('Invalid input values');
          }

          const bmr = this.calculateBMR(weightInKg, heightInCm);
          this.tdee = Math.round(bmr * parseFloat(this.activityLevel));
        } catch (error) {
          alert('Error calculating TDEE. Please check your inputs.');
          this.tdee = null;
        } finally {
          this.loading = false;
        }
      }, 1000);
    }
  }
});