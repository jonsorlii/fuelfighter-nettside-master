export default class joinService {
    static async sendForm(form) {
        return fetch(`/backend/joinApplication.php`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(form)
          })
          .then((result) => result.json())
          .then((res) => {
              console.log(res);
              return res;
          });
    }

    static evaluateForm(form) {
        var evaluation = [];

        if (form.firstname === null || form.firstname === '') {
            evaluation.push('Please fill in firstname');
        }
        if (form.lastname === null || form.lastname === '') {
            evaluation.push('Please fill in lastname');
        }
        if (form.email === null || form.email === '') {
            evaluation.push('Please fill in email');
        }
        if (form.description === null || form.description === '') {
            evaluation.push('Please fill in about you and why you want to apply');
        }
        if (form.selectedPositions === null || form.selectedPositions.length === 0) {
            evaluation.push('Please select at least one position');
        }

        return evaluation;
    }
}