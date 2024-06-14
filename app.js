new Vue({
  el: '.tdee-calculator',
  data: {
    gender: '',
    age: '',
    weight: '',
    heightFeet: '',
    heightInches: '',
    heightCm: '',
    activity: '',
    weightUnit: 'lbs', // Default weight unit
    heightUnit: 'inches', // Default height unit
    tdee: null,
    loading: false
  },
  methods: {
    calculateTDEE() {
      this.loading = true;
      setTimeout(() => {
        let weightInKg = this.weightUnit === 'lbs' ? this.weight * 0.45359237 : this.weight;
        let heightInCm;

        if (this.heightUnit === 'cm') {
          heightInCm = this.heightFeet * 30.48; // Convert feet to cm
          heightInCm += this.heightInches * 2.54; // Add inches converted to cm
        } else {
          heightInCm = (this.heightFeet * 30.48) + (this.heightInches * 2.54); // Convert feet and inches to cm
        }

        if (this.heightUnit === 'cm') {
          heightInCm = parseFloat(this.heightCm); // Use the height in cm directly
        } else {
          heightInCm = (parseFloat(this.heightFeet) * 30.48) + (parseFloat(this.heightInches) * 2.54); // Convert feet and inches to cm
        }

        if (isNaN(heightInCm) || isNaN(weightInKg)) {
          this.tdee = 'Invalid input, please check your entries.';
          this.loading = false;
          return;
        }

        let bmr;

        // Calculate BMR based on gender
        if (this.gender === 'male') {
          bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * this.age);
        } else if (this.gender === 'female') {
          bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * this.age);
        }

        // Adjust BMR based on activity level
        const activityMultiplier = {
          sedentary: 1.2,
          light: 1.375,
          moderate: 1.55,
          active: 1.725,
          veryActive: 1.9
        };

        this.tdee = Math.round(bmr * activityMultiplier[this.activity]);
        this.loading = false;
      }, 2000);
    }
  }
});
