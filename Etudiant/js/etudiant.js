// Databases
const LISTE_ETUDIANTS = [];

// Objets
function Matiere(_libelle = '', _note = 0) {
    this.nom = _libelle;
    this.note = _note;
}

function Etudiant(_nom = '', _prenom = '', _sexe = '', _dateNais = '', _lieuNais, _parcours = '', _poids = 0, _taille = 0.0, _matieres = []) {
    this.nom = _nom;
    this.prenom = _prenom;
    this.dateNais = _dateNais;
    this.lieuNais = _lieuNais;
    this.parcours = _parcours;
    this.matieres = _matieres;
    this.sexe = _sexe;
    this.poids = _poids;
    this.taille = _taille;
}
  
// Add action to matiere add button
var _tempMatieres = [];
let _addMatiereButton = document.getElementById('btn_addM');
_addMatiereButton.addEventListener('click', () => {
    let _matiere = document.getElementById('matiere').value;
    let _note = document.getElementById('txt_note').value;

    let matiere = new Matiere(_matiere, _note);
    _tempMatieres.push(matiere);

    let _tr = document.createElement('tr');
    let _tdM = document.createElement('td'); _tdM.innerHTML = _matiere;
    let _tdN = document.createElement('td'); _tdN.innerHTML = _note;
    let _tdAction = document.createElement('td');
    let _btnDele = document.createElement('button'); _btnDele.innerHTML = '-';
    let _btnMore = document.createElement('button'); _btnMore.innerHTML = '+';

    _tdAction.appendChild(_btnMore);
    _tdAction.appendChild(_btnDele);
    _tr.appendChild(_tdM);
    _tr.appendChild(_tdN);
    _tr.appendChild(_tdAction);

    document.getElementById('tab_note').appendChild(_tr);


    document.getElementById('matiere').value = '';
    document.getElementById('txt_note').value = '';
});

// Add action to student save button
let _saveButton = document.getElementById('btn_save');
_saveButton.addEventListener('click',

    function onSaveButtonClick(matiere) {
        // Get textbox values
        let _sexe;
        let _nom = document.getElementById('txt_nom').value;
        let _prenom = document.getElementById('txt_prenom').value;
        let _dateNais = document.getElementById('txt_dnais').value;
        let _lieuNais = document.getElementById('txt_lnais').value;
        let _parcours = document.getElementById('parcours').value;
        if (document.getElementById('hom').checked){
            _sexe = document.getElementById('hom').value;
        }
        else {
            _sexe = document.getElementById('fem').value;
        }
        // let _sexe = document.getElementById('sexe').value;
        let _poids = document.getElementById('txt_poids').value;
        let _taille = document.getElementById('txt_taille').value;

        let _student = new Etudiant(_nom, _prenom, _sexe, _dateNais, _lieuNais, _parcours, _poids, _taille, matiere);
        saveNewStudent(_student);
        showStudentOnTable(_student);

        alert('Etudiant sauvegarde !');
        clearFormData();
    });

function saveNewStudent(_student = new Etudiant()) {
    LISTE_ETUDIANTS.push(_student);
}

function showStudentOnTable(_currentStudent = new Etudiant()) {

    // Get table Id
    let _myTable = document.getElementById('info_tab');

    // I create the new row
    let _tr = document.createElement('tr');
    _tr.setAttribute('pour', 'vrai');

    // I create the cols
    let _tdNo = document.createElement('td'); _tdNo.innerHTML = LISTE_ETUDIANTS.length;
    let _tdNom = document.createElement('td'); _tdNom.innerHTML = _currentStudent.nom + ' ' + _currentStudent.prenom;
    let _tdDate = document.createElement('td'); _tdDate.innerHTML = _currentStudent.dateNais;
    let _tdLieu = document.createElement('td'); _tdLieu.innerHTML = _currentStudent.lieuNais;
    let _tdSexe = document.createElement('td'); _tdSexe.innerHTML = _currentStudent.sexe;
    let _tdParcours = document.createElement('td'); _tdParcours.innerHTML = _currentStudent.parcours;
    let _tdAction = document.createElement('td');

    // Actions buttons
    let _btnEdit = document.createElement('a');
    _btnEdit.setAttribute('class', 'btn btn-warning');
    _btnEdit.innerHTML = '+ ';

    let _btnDele = document.createElement('a');
    _btnDele.setAttribute('class', 'btn btn-danger text-dark mx-2');
    _btnDele.innerHTML = '-';
    _btnDele.addEventListener('click', () => {
        console.log('Avant', LISTE_ETUDIANTS);

        _studentId = parseInt(_tdNo.innerHTML) - 1;
        LISTE_ETUDIANTS.splice(_studentId, 1);
        _myTable.removeChild(_tr);

        // Clear detailled infos
        document.getElementById('lenom').innerHTML = '';
        document.getElementById('leprenom').innerHTML = '';
        document.getElementById('ledate').innerHTML = '';
        document.getElementById('leparcours').innerHTML = '';
        document.getElementById('tab_mynote').innerHTML = '';

        console.log('Apres', LISTE_ETUDIANTS);
    });

    // Add child to tags
    _tdAction.appendChild(_btnEdit);
    _tdAction.appendChild(_btnDele);

    _tr.appendChild(_tdNo);
    _tr.appendChild(_tdNom);
    _tr.appendChild(_tdDate);
    _tr.appendChild(_tdLieu);
    _tr.appendChild(_tdSexe);
    _tr.appendChild(_tdParcours);
    _tr.appendChild(_tdAction);

    // Action when student row is selected
    _tr.addEventListener(
        'click',
        () => showStudentDetailledInfos(parseInt(_tdNo.innerHTML) - 1)
    );

    // Add my new row to the table
    _myTable.appendChild(_tr);
}

function showStudentDetailledInfos(_studentId) {
    let _id = _studentId;
    let _student = LISTE_ETUDIANTS[_id];

    // Person
    document.getElementById('lenom').innerHTML = '<b>Nom & prenom : </b>' + _student.nom + ' ' + _student.prenom;
    document.getElementById('leprenom').innerHTML = '<b>Date et lieu de naissance : </b><br />' + _student.dateNais + ' <b>a</b> ' + _student.lieuNais;
    document.getElementById('ledate').innerHTML = '<b>Sexe</b> : ' + _student.sexe;
    document.getElementById('leparcours').innerHTML = '<b>Parcours</b> : ' + _student.parcours;
    document.getElementById('lepersonne').innerHTML = '<b>Poids</b> : ' + _student.poids + ' kg <b>Taille</b> : ' + _student.taille / 100 + ' m';

    // Notes
    document.getElementById('tab_mynote').innerHTML = '';
    let _notes = _student.matieres;
    if (_notes.length > 0) {

        _notes.forEach((note) => {
            let _tab_note = document.getElementById('tab_mynote');
            let _tr = document.createElement('tr');
            let _tdMat = document.createElement('td'); _tdMat.innerHTML = note.nom;
            let _tdNot = document.createElement('td'); _tdNot.innerHTML = note.note;
            _tr.appendChild(_tdMat);
            _tr.appendChild(_tdNot);
            _tab_note.appendChild(_tr);
        });
    }
}

function clearFormData() {
    _tempMatieres = [];
    document.getElementById('txt_nom').value = '';
    document.getElementById('txt_prenom').value = '';
    document.getElementById('txt_dnais').value = '';
    document.getElementById('txt_lnais').value = '';
    document.getElementById('parcours').value = '';

    document.getElementById('matiere').value = '';
    document.getElementById('txt_note').value = '';
    document.getElementById('tab_note').innerHTML = '';
}