import React from "react";

import { useParams } from "react-router-dom";
import MainNavigation from "../common/navigation/MainNavigation";
import Button from "../common/FormElements/Button";
import Card from "../common/UIElements/Card";

import Error404Page from "../common/UIElements/Error404Page";

import './LegalNotice.css';

const LegalNotice = props => {
    const school = useParams().school;

    return (
        <React.Fragment>

            {(school == "grand-hallet" || school == "moxhe") && 
             <div>


            {school == "grand-hallet" && 
                <MainNavigation schoolLink="grand-hallet"
                                schoolLogo="/svg/Grand-Hallet_blanc.svg" />}

            {school == "moxhe" && 
            <MainNavigation schoolLink="moxhe"
                            schoolLogo="/svg/Moxhe_blanc.svg" />}

            <div>

            <Card>


            <h2 className="legal-notice-main-title">Mentions légales</h2><br></br><br></br>

            <div style={{marginLeft: "5%", marginRight: "5%"}}>

            <h3 className="legal-notice-second-title">
            Politique de protection de la vie privée et des données à caractère personnel – R.G.P.D.
            </h3>

            <p className="legal-notice-para">
            Le traitement de nombreuses données à caractère personnel s’est vu renforcer par l’entrée en vigueur, 
            le 25 mai 2018, du règlement général sur la protection des données (en abrégé R.G.P.D.) instaurant une réglementation harmonisée
             en matière de protection des données, directement applicable au sein de l’union européenne.
             <br></br><br></br>
             Ce RGPD n’est pas une nouveauté car il s’inscrit dans la continuité de la loi belge du 8 décembre 1992 relative
              à la protection de la vie privée à l’égard des traitements de données à caractère personnel.
              <br></br><br></br>
              Le respect de ces règles constitue un gage de sécurité juridique et informatique profitable à l’ensemble de la collectivité ainsi
               qu’un vecteur de confiance et de valorisation de l’image de l’institution auprès des personnes concernées par le traitement des 
               données à caractère personnel.
                <br></br><br></br>
                Répondre aux exigences dudit règlement engendre de véritables changements par la mise en place de mesures organisationnelles et
                 techniques permettant de démontrer à tout moment que l’administration offre un niveau optimal de protection des données traitées 
                 et ainsi répondre aux besoins de confiance des administrés.
            </p>

            <h3 className="legal-notice-second-title">
            Droits des personnes concernées par le traitement de leurs données à caractère personnel
            </h3>

            <p className="legal-notice-para">Les droits suivants vous sont garantis conformément à la réglementation en matière de la protection des données à caractère personnel :<br></br>
            </p>
            <p className="legal-notice-para-list">
                • le droit à l’information et à la transparence à la fois spontanée et à la demande<br></br>
                • le droit de consultation ou droit d’accès<br></br>
                • le droit de rectification ou de correction<br></br>
                • le droit à l’oubli et à l’effacement des données<br></br>
                • le droit au libre consentement et au retrait du consentement donné<br></br>
                • le droit au transfert ou à la portabilité des données<br></br>
                • le droit de ne pas faire l’objet d’une décision automatisée<br></br>
                • le droit de vous voir notifier les failles de sécurités qui vous concernent le cas échéant
            </p>

            <h3 className="legal-notice-second-title">
            Droit à l’image
            </h3>

            <p className="legal-notice-para">
            Les écoles fondamentales de Hannut II sont soucieuses de respecter le droit à l’image.
            <br></br><br></br>
            Toutefois, toute personne qui apparaîtrait sur une photographie et qui n’a pas donné d’autorisation quant à sa diffusion,
            est invité à contacter la direction afin de la faire retirer en envoyant un courrier électronique.
            </p>

            <h3 className="legal-notice-second-title">
            Propriété et gestion du site web
            </h3>

            <p className="legal-notice-para">
            Ce site web appartient à l’administration communale des écoles de Hannut II, 
            respectivement les établissement de Grand-Hallet et de Moxhe.

            <br></br><br></br>
            Son hébergement est assuré par Microsoft Azure.

            <br></br><br></br>

            Toute reproduction, partielle ou complète, est interdite.
            </p>

            </div>

            </Card>


            </div>

            </div>}

            {(school != "grand-hallet" && school != "moxhe") && 
            <Error404Page />}

        </React.Fragment>
    )
}

export default LegalNotice;