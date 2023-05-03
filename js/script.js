 new Vue({
    el: '#app',
    data: {
      errorMessage: ''
    },

       // выполняем запрос к файлу json
    mounted: function() {
      fetch('https://service-apm.ru/test_json.php')
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка: файл json не найден.');
          }
          return response.json();
        })
        .then(data => {
            // Если данные получены и не содержат нулевых или нечисловых значений
          if (data && data.data && !Object.values(data.data).some(val => isNaN(val) || val === null)) {
            let values = Object.values(data.data);
            let labels = Object.keys(data.data);
               // Если значения содержат десятичные дроби, округляю до двух знаков
            if (values.some(val => val % 1 !== 0)) {
              values = values.map(val => val.toFixed(2));
            }
                let ctx = document.getElementById('myChart').getContext('2d');
                myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                  labels: labels,
                  datasets: [{
                    label: 'Данные',
                    data: values,
                    backgroundColor: [
                      'rgba(51, 153, 255, 0.6)',
                      'rgba(102, 204, 102, 0.6)',
                      'rgba(255, 153, 0, 0.6)',
                    ],
                    borderColor: [
                      'rgba(51, 153, 255, 1)',
                      'rgba(102, 204, 102, 1)',
                      'rgba(255, 153, 0, 1)',
                    ],
                    borderWidth: 2
                  }]
                },
                options: {
                  title: {
                    display: true,
                    text: 'Диаграмма'
                  },
                  legend: {
                    display: false, 
                  },
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true,
                        fontColor: 'black'
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Значения',
                        fontColor: 'black',
                        fontSize: 14
                      }
                    }],
                    xAxes: [{
                      ticks: {
                        fontColor: 'black'
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Категории',
                        fontColor: 'black',
                        fontSize: 14
                      }
                    }]
                  }
                }
              });
              } else {
                   // Если данные не содержат значений или содержат нечисловые значения, генерируется ошибка
                throw new Error('Ошибка: некорректные данные.');
              }
            })
              // Если ошибка связана с библиотеками/файлом json, выводится ошибка пользователю с присвоением ей значение переменной 
            .catch(error => {
              console.error(error);
              this.errorMessage = error.message;
            });
        }
      })