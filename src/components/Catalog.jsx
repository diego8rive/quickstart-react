// src/components/Catalog.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Sample products data (you can replace this with your actual data)
const products = [
    {
        "Id": "f6e9cb18-7967-429f-8735-b13098e3bccc",
        "Nova_Name": "Nova_SPL_620",
        "Name": "SPL-620",
        "Category": "Scanner",
        "Image": "/assets/images/spl620.jpg"
    },
    {
        "Id": "b339b851-d291-40bc-86ae-61a7f0c8620e",
        "Nova_Name": "Nova_Autel_EVO_II_RTK_V3",
        "Name": "Autel Evo II RTK V3",
        "Category": "Dron_Aereo",
        "Image": "/assets/images/EVO2.jpg"
    },
    {
        "Id": "fbfd0d0b-9e71-4dc2-8d94-21c3bd3e25aa",
        "Nova_Name": "Nova_Colector_de_Datos_H6",
        "Name": "South H6",
        "Category": "Colector",
        "Image": "/assets/images/H6_1.png"
    },
    {
        "Id": "791977b3-6ddb-4167-ac9b-85d9d09cb2ee",
        "Nova_Name": "Nova_Distanciometro_Laser_PD-520N",
        "Name": "South PD-520N",
        "Category": "Distanciometros",
        "Image": "/assets/images/PD-520N.png"
    },
    {
        "Id": "73f3069d-dcff-4e0c-82de-2ddf8b419866",
        "Nova_Name": "Nova_ECHOTRAC_E20",
        "Name": "ECHOTRAC E20",
        "Category": "Eco_Sonda",
        "Image": "/assets/images/E20.jpg"
    },
    {
        "Id": "e97e7c0e-6ea2-4d80-9b57-6a9082a8125a",
        "Nova_Name": "Nova_Ecosonda_SOUTH_SDE-28S",
        "Name": "South SDE-28S",
        "Category": "Eco_Sonda",
        "Image": "/assets/images/South SDE-28S+.png"
    },
    {
        "Id": "9fc229e6-6852-407b-b947-66920f7cede1",
        "Nova_Name": "Nova_Escaner_Laser_3D_Portatil_RobotSLAM",
        "Name": "RobotSlam",
        "Category": "RobotSlam",
        "Image": "/assets/images/ROBOT SLAM_1.png"
    },
    {
        "Id": "756f4623-85a6-4fd7-bb58-d22fca3c842d",
        "Nova_Name": "Nova_RobotSLAM_Lite",
        "Name": "RobotSlam Lite",
        "Category": "RobotSlam",
        "Image": "/assets/images/RobotSLAM Lite_1.png"
    },
    {
        "Id": "95bc1dd4-32b6-43a8-86b2-f66257afcfd6",
        "Nova_Name": "Nova_Estacion_Total_N1",
        "Name": "South N1",
        "Category": "Estacion_Total",
        "Image": "/assets/images/N1_2.png"
    },
    {
        "Id": "6e712127-e453-474f-90a6-ebbc4c06a7ec",
        "Nova_Name": "Nova_Estacion_Total_N6",
        "Name": "South N6",
        "Category": "Estacion_Total",
        "Image": "/assets/images/N6_1.png"
    },
    {
        "Id": "f68d4a67-7a50-4e43-a49a-d59eaea8ef96",
        "Nova_Name": "Nova_Estacion_Total_Robotica_NS30",
        "Name": "South NS30",
        "Category": "Estacion_Total",
        "Image": "/assets/images/NS30_1.png"
    },
    {
        "Id": "d2ce211a-6185-4503-9f2d-344c65cce6d8",
        "Nova_Name": "Nova_GEO5_Software_Integral",
        "Name": "GEO5",
        "Category": "Software",
        "Image": "/assets/images/geo5.png"
    },
    {
        "Id": "8b45c4d2-e122-4210-9a00-f03a0e7124ab",
        "Nova_Name": "Nova_Global_Mapper_Software_SIG",
        "Name": "Global Mapper",
        "Category": "Software",
        "Image": "/assets/images/global_mapper.png"
    },
    {
        "Id": "4cf8a843-697b-4e95-8f5f-c6973f114aaf",
        "Nova_Name": "Nova_GNSS_Galaxy_G4_Receptor",
        "Name": "Galaxy G4",
        "Category": "GNSS",
        "Image": "/assets/images/G4_1.png"
    },
    {
        "Id": "ac4b98b2-4937-41a4-971e-b7b88e93185c",
        "Nova_Name": "Nova_GNSS_Galaxy_G9_Receptor",
        "Name": "Galaxy G9",
        "Category": "GNSS",
        "Image": "/assets/images/G9_1.png"
    },
    {
        "Id": "df47be9c-e70e-4314-8b2c-d6526311afbe",
        "Nova_Name": "Nova_GNSS_Insight_V2_SOUTH",
        "Name": "Insight",
        "Category": "GNSS",
        "Image": "/assets/images/V2_1.png"
    },
    {
        "Id": "79821a33-a8c1-4e21-b684-9f7d653069df",
        "Nova_Name": "Nova_GNSS_RTK_G7Q_SOUTH",
        "Name": "Galaxy G7Q",
        "Category": "GNSS",
        "Image": "/assets/images/Galaxy-G7.png"
    },
    {
        "Id": "b88f7f39-f913-459a-9bd3-5dd9103e3480",
        "Nova_Name": "Nova_HYPACK_Software_Hidrografico",
        "Name": "HYPACK",
        "Category": "Software",
        "Image": "/assets/images/hypack.jpg"
    },
    {
        "Id": "0f794a88-f7e0-42f4-b31c-3e49400d4370",
        "Nova_Name": "Nova_NET_S10_Mini_Receptor",
        "Name": "South Net S10 mini",
        "Category": "CORS",
        "Image": "/assets/images/Net10_1.png"
    },
    {
        "Id": "ae66a7f7-64aa-4cb1-8f35-9e3533ffed8f",
        "Nova_Name": "Nova_Nivel_Digital_DL-2007",
        "Name": "DL-2007",
        "Category": "Nivel_Digital",
        "Image": "/assets/images/DL-2007.png"
    },
    {
        "Id": "bd2ffed5-7ba5-43eb-a308-b799dd868a8c",
        "Nova_Name": "Nova_SeaBat_T50-P_Sonar",
        "Name": "SeaBat T50-P",
        "Category": "Eco_Sonda",
        "Image": "/assets/images/T50-P.jpg"
    },
    {
        "Id": "4b5e8e99-671e-40f1-92a7-04be9c5e01fd",
        "Nova_Name": "Nova_Sensor_Nivel_Radar_VRS20",
        "Name": "VRS-20 Radar Level",
        "Category": "Hidrologia",
        "Image": "/assets/images/mo-val-vrs00.jpg"
    },
    {
        "Id": "1bb84ede-3eeb-42a9-9392-8c530e3c8145",
        "Nova_Name": "Nova_Sonda_Caudal_Agua_FLOW_PROBE_FP111",
        "Name": "Sonda FP111",
        "Category": "Hidrologia",
        "Image": "/assets/images/FP111.jpg"
    },
    {
        "Id": "89625a4b-8629-47b5-9c6f-60f424162b84",
        "Nova_Name": "Nova_SOUTH_MR1_GNSS_Vigilancia",
        "Name": "South MR1",
        "Category": "Monitoreo",
        "Image": "/assets/images/SOUTH MR1_1.png"
    },
    {
        "Id": "0f7f430f-e839-4fb3-a3d1-c5cad131d3d5",
        "Nova_Name": "Nova_SurvStar_Software_Geoespacial",
        "Name": "Survstar",
        "Category": "Software",
        "Image": "/assets/images/Survstar-pic.jpg"
    },
    {
        "Id": "37305d78-dcf4-45b6-b7d2-3dd0ef2bc141",
        "Nova_Name": "Nova_SWiFT_SVP_Perfilador",
        "Name": "Valeport SWIFT",
        "Category": "Hidrologia",
        "Image": "/assets/images/SWiFTSVP-2048x1365.jpg.png"
    },
    {
        "Id": "70715b88-5831-42ac-80c2-43887a095a05",
        "Nova_Name": "Nova_TideMaster_Mareografo",
        "Name": "Tide Master",
        "Category": "Hidrologia",
        "Image": "/assets/images/TideMaster-new-label-Extended-Ba.png"
    },
    {
        "Id": "c1e72589-0a2f-4623-b081-819e69e5fcb9",
        "Nova_Name": "Nova_WAM-V_16_Embarcacion_Polivalente",
        "Name": "WAM-V-16",
        "Category": "Dron_Acuatico",
        "Image": "/assets/images/wamv16.jpg"
    },
    {
        "Id": "b52a525d-f500-46d2-8e66-946d58e31197",
        "Nova_Name": "Nova_WL16_Registrador_Nivel_Agua",
        "Name": "WL16",
        "Category": "Hidrologia",
        "Image": "/assets/images/Global-Water-WL-16-600x600.png"
    }
];

const Catalog = () => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [activeFilter, setActiveFilter] = useState('all');

    // Handle filter change
    const handleFilterChange = (category) => {
        setActiveFilter(category);
        if (category === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) => product.Category === category);
            setFilteredProducts(filtered);
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <header className="text-center py-8">
                <h1 className="text-4xl font-bold text-glow">Nuestros Productos</h1>
            </header>

            <div className="container mx-auto mt-10">
                {/* Filter Buttons */}
                <div className="text-center mb-6">
                    {[
                        { label: 'Todos', value: 'all' },
                        { label: 'Drones Aéreos', value: 'Dron_Aereo' },
                        { label: 'Eco Sondas', value: 'Eco_Sonda' },
                        { label: 'Colectores', value: 'Colector' },
                        { label: 'Software', value: 'Software' },
                        { label: 'GNSS', value: 'GNSS' },
                        { label: 'Hidrología', value: 'Hidrologia' },
                        { label: 'Estación Total', value: 'Estacion_Total' },
                        { label: 'Nivel Digital', value: 'Nivel_Digital' },
                        { label: 'Monitoreo', value: 'Monitoreo' },
                    ].map((filter) => (
                        <button
                            key={filter.value}
                            className={`filter-btn bg-neon-purple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded button-glow m-1 ${activeFilter === filter.value ? 'underline' : ''
                                }`}
                            onClick={() => handleFilterChange(filter.value)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Product Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="product-container">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.Id}
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:translate-y-1 hover:shadow-card-hover card-hover"
                        >
                            <img
                                src={product.Image}
                                alt={product.Name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{product.Name}</h2>
                                <p className="mb-4">Categoría: {product.Category}</p>
                                <Link to={`/assistant/${product.Id}`}>
                                    <button className="bg-neon-purple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded button-glow">
                                        Consultar Asistente
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Catalog;