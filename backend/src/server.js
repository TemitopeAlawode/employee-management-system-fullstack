/* eslint-disable no-undef */
const app = require('./app');

const PORT = process.env.PORT || 8000;

// to start up the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

//  to test if it's working
app.get('/', (req, res) => {
    res.status(200).json({message: 'Working well....'})
});

