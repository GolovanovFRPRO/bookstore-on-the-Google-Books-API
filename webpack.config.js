const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Укажите ваш основной файл
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/img', to: 'images' }, // Копируем всю папку img в images
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // Обрабатываем файлы с расширением .scss
        use: [
          'style-loader', // Вставляет CSS в DOM
          'css-loader'   // Обрабатывает CSS
        ],
      },
      {
        test: /\.scss$/, // Обрабатываем файлы с расширением .scss
        use: [
          'style-loader', // Вставляет CSS в DOM
          'css-loader',   // Обрабатывает CSS
          'sass-loader'  // Компилирует SASS в CSS
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource', // Тип ресурса для шрифтов
        generator: {
          filename: 'fonts/[name][ext]' // Куда положить шрифты
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.scss'], // Добавьте расширения, которые вы хотите обрабатывать
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist') // Сюда положите index.html
    },
    compress: true,
    port: 9000,
    open: true
  },
  mode: 'production', // Установите режим (development или production)
};