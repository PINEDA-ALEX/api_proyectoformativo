const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// Importa los modelos y la conexión de Sequelize
const { sequelize } = require('./models/index');

// Sincroniza la base de datos con los modelos.
// El { alter: true } es útil para desarrollo, ya que actualiza las tablas sin borrarlas.
sequelize.sync({ alter: true })
  .then(() => {
    console.log('¡Base de datos y tablas sincronizadas!');
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });

// --- Middleware ---
// Configura el middleware para procesar las peticiones
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Habilita CORS para permitir peticiones desde otras aplicaciones (como tu front-end)
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Si usas variables de entorno, asegúrate de que se carguen al principio
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// --- Rutas ---
// Importa los archivos de rutas de cada entidad
const rolesRoutes = require('./api/APIguiasv1/routes/roles.routes');
const usersRoutes = require('./api/APIguiasv1/routes/users.routes');
const especialidadesRoutes = require('./api/APIguiasv1/routes/specialties.routes');
const competencesRoutes = require('./api/APIguiasv1/routes/competences.routes');
const trainigprogramsRoutes = require('./api/APIguiasv1/routes/trainigprograms.routes');
const guidesRoutes = require('./api/APIguiasv1/routes/guides.routes');
const learningmomentsRoutes = require('./api/APIguiasv1/routes/learningmoments.routes');
const resultsRoutes = require('./api/APIguiasv1/routes/results.routes');
const teachingtechniquesRoutes = require('./api/APIguiasv1/routes/teachingtechniques.routes');
const generatedmomentsRoutes = require('./api/APIguiasv1/routes/generatedmoments.routes');
const authRoutes = require('./api/APIguiasv1/routes/auth.routes');


// Conecta cada archivo de ruta a un prefijo de URL
app.use('/api/APIguiasv1/roles', rolesRoutes);
app.use('/api/APIguiasv1/users', usersRoutes);
app.use('/api/APIguiasv1/especialidades', especialidadesRoutes);
app.use('/api/APIguiasv1/competences', competencesRoutes);
app.use('/api/APIguiasv1/trainigprograms', trainigprogramsRoutes);
app.use('/api/APIguiasv1/guides', guidesRoutes);
app.use('/api/APIguiasv1/learningmoments', learningmomentsRoutes);
app.use('/api/APIguiasv1/results', resultsRoutes);
app.use('/api/APIguiasv1/teachingtechniques', teachingtechniquesRoutes);
app.use('/api/APIguiasv1/generatedmoments', generatedmomentsRoutes);
app.use('/api/APIguiasv1/auth', authRoutes);
  


// --- Endpoints de prueba ---
app.get('/', (req, res) => {
  res.json({ message: '¡API funcionando correctamente!' });
});

// --- Iniciar el servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});