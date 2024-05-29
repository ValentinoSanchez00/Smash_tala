module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      client: {
        jasmine: {
          // Puedes agregar opciones de configuración para Jasmine aquí.
          // Las opciones posibles están listadas en https://jasmine.github.io/api/edge/Configuration.html
          // Por ejemplo, puedes deshabilitar la ejecución aleatoria con `random: false`
          // o establecer una semilla específica con `seed: 4321`
        },
        clearContext: false // Deja visible la salida del Jasmine Spec Runner en el navegador.
      },
      jasmineHtmlReporter: {
        suppressAll: true // Elimina los rastros duplicados.
      },
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage/your-project-name'),
        subdir: '.',
        reporters: [{ type: 'html' }, { type: 'text-summary' }]
      },
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      restartOnFileChange: true
    });
  };
  