import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, UserCheck, UserX, Clock, Award, Search, Filter, Users } from 'lucide-react';

const GestionnairePlanDeTable = () => {
  const [invites, setInvites] = useState(() => {
    const savedInvites = localStorage.getItem('invites');
    return savedInvites ? JSON.parse(savedInvites) : [];
  });
  
  const [tables, setTables] = useState(() => {
    const savedTables = localStorage.getItem('tables');
    return savedTables ? JSON.parse(savedTables) : [
      { id: 1, nom: 'Table 1', places: 8 },
      { id: 2, nom: 'Table 2', places: 8 }
    ];
  });
  
  const [nouvelInvite, setNouvelInvite] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    status: 'en_attente',
    tableId: ''
  });
  
  const [nouvelleTable, setNouvelleTable] = useState({
    nom: '',
    places: 8
  });
  
  const [activeTab, setActiveTab] = useState('invites');
  const [modeEdition, setModeEdition] = useState(false);
  const [inviteEnEdition, setInviteEnEdition] = useState(null);
  const [recherche, setRecherche] = useState('');
  const [filtreStatus, setFiltreStatus] = useState('tous');
  const [filtreTable, setFiltreTable] = useState('toutes');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  
  useEffect(() => {
    localStorage.setItem('invites', JSON.stringify(invites));
  }, [invites]);
  
  useEffect(() => {
    localStorage.setItem('tables', JSON.stringify(tables));
  }, [tables]);
  
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  const ajouterInvite = () => {
    if (nouvelInvite.nom.trim() === '' || nouvelInvite.prenom.trim() === '') return;
    
    const newInvite = {
      id: Date.now(),
      ...nouvelInvite
    };
    
    setInvites([...invites, newInvite]);
    setNouvelInvite({
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      status: 'en_attente',
      tableId: ''
    });
    
    setIsFormOpen(false);
  };
  
  const supprimerInvite = (id) => {
    setInvites(invites.filter(invite => invite.id !== id));
  };
  
  const commencerEdition = (invite) => {
    setInviteEnEdition(invite);
    setModeEdition(true);
    setNouvelInvite({ ...invite });
    setIsFormOpen(true);
  };
  
  const sauvegarderEdition = () => {
    setInvites(invites.map(invite => 
      invite.id === inviteEnEdition.id ? { ...nouvelInvite } : invite
    ));
    setModeEdition(false);
    setInviteEnEdition(null);
    setNouvelInvite({
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      status: 'en_attente',
      tableId: ''
    });
    setIsFormOpen(false);
  };
  
  const annulerEdition = () => {
    setModeEdition(false);
    setInviteEnEdition(null);
    setNouvelInvite({
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      status: 'en_attente',
      tableId: ''
    });
    setIsFormOpen(false);
  };
  
  const ajouterTable = () => {
    if (nouvelleTable.nom.trim() === '') return;
    
    const newTable = {
      id: Date.now(),
      ...nouvelleTable
    };
    
    setTables([...tables, newTable]);
    setNouvelleTable({
      nom: '',
      places: 8
    });
  };
  
  const supprimerTable = (id) => {
    // Déplacer les invités de cette table vers "sans table"
    const invitesUpdated = invites.map(invite => 
      invite.tableId === id ? { ...invite, tableId: '' } : invite
    );
    
    setInvites(invitesUpdated);
    setTables(tables.filter(table => table.id !== id));
  };
  
  const changerStatus = (id, nouveauStatus) => {
    setInvites(invites.map(invite => 
      invite.id === id ? { ...invite, status: nouveauStatus } : invite
    ));
  };