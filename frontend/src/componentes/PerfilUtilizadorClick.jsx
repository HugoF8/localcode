import React, { useEffect, useState } from 'react';

const PerfilUtilizadorClick = ({ userId, onClose }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');


  useEffect(() => {
    // Simulação de fetch à base de dados
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/perfil/verPerfilUtilizador/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar dados do utilizador:", error);
      }
    };

    if (!res.ok) throw new Error(`Erro: ${res.status}`);
    const data = res.json();

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl">
          &times;
        </button>

        <div className="h-28 bg-gradient-to-r from-blue-600 to-blue-300 rounded-t-xl" />

        <div className="p-6 flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center -mt-10 border-4 border-white">
            <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <h2 className="mt-4 font-bold text-xl">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-400">{user.createdAt?.split('T')[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default PerfilUtilizadorClick;
