
import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getCompanyBySublink } from '@/services/api/company';

const TenantWrapper = () => {
  const { sublink } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const companyData = await getCompanyBySublink(sublink);
        setCompany(companyData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [sublink]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando cardápio...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Erro: {error}</div>;
  }

  return (
    <>
      <Helmet>
        <title>{`${company?.name || 'Cardápio'} - PedeAki Online`}</title>
        <meta name="description" content={`Confira o cardápio de ${company?.name || 'nosso restaurante'} e faça seu pedido!`} />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`${company?.name || 'Cardápio'} - PedeAki Online`} />
        <meta property="og:description" content={`Confira o cardápio de ${company?.name || 'nosso restaurante'} e faça seu pedido!`} />
        {company?.thumbnail_url && (
            <meta property="og:image" content={company.thumbnail_url} />
        )}
        <meta property="og:type" content="website" />
      </Helmet>
      <Outlet context={{ company }} />
    </>
  );
};

export default TenantWrapper;
