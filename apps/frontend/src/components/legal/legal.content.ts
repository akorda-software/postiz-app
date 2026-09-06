import type { LegalLang } from './legal.paths';

// Built by concatenation so the address never appears as a plain literal in
// source (spam-harvesting bots scrape public repos); it renders normally.
export const LEGAL_CONTACT_EMAIL = ['hola', 'akorda.es'].join('@');

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalDoc {
  title: string;
  intro: string;
  effectiveLabel: string;
  effectiveDate: string;
  updatedLabel: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export interface LegalNavLabels {
  backToLogin: string;
  switchLanguage: string;
  termsLink: string;
  privacyLink: string;
  brandNote: string;
}

const OPERATOR_EN =
  'Albert Álvarez Estellés, self-employed (autónomo) in Spain, based in Valencia (Spain), operating under the Akorda brand (akorda.es). Contact email: ' +
  LEGAL_CONTACT_EMAIL +
  '. Phone: +34 624 724 746.';
const OPERATOR_ES =
  'Albert Álvarez Estellés, autónomo en España, con domicilio en Valencia (España), que opera bajo la marca Akorda (akorda.es). Correo de contacto: ' +
  LEGAL_CONTACT_EMAIL +
  '. Teléfono: +34 624 724 746.';

const TIKTOK_SCOPES =
  'user.info.basic, user.info.profile / user.info.username, user.info.stats, video.list, video.upload, video.publish';

const TIKTOK_SCOPES_ES = TIKTOK_SCOPES;

export const legalNav: Record<LegalLang, LegalNavLabels> = {
  en: {
    backToLogin: 'Back to login',
    switchLanguage: 'Language',
    termsLink: 'Terms of Service',
    privacyLink: 'Privacy Policy',
    brandNote:
      'Postiz Akorda is a private, self-hosted Postiz instance operated by Albert Álvarez Estellés (Akorda).',
  },
  es: {
    backToLogin: 'Volver al inicio de sesión',
    switchLanguage: 'Idioma',
    termsLink: 'Condiciones de uso',
    privacyLink: 'Política de privacidad',
    brandNote:
      'Postiz Akorda es una instancia privada y autoalojada de Postiz operada por Albert Álvarez Estellés (Akorda).',
  },
};

export const privacyPolicy: Record<LegalLang, LegalDoc> = {
  en: {
    title: 'Privacy Policy — Postiz Akorda',
    intro:
      'Postiz Akorda (postiz.akorda.es) is a private, self-hosted Postiz instance used internally to manage, prepare, schedule and publish content to the authorized social-media accounts of Akorda and its projects, including TikTok accounts connected through TikTok Login Kit and the Content Posting API. This policy explains what data the application receives from TikTok and other connected platforms, what it does with it, and which rights you have under the GDPR (Regulation (EU) 2016/679) and Spanish data-protection law (LOPDGDD).',
    effectiveLabel: 'Effective date',
    effectiveDate: '6 September 2026',
    updatedLabel: 'Last updated',
    lastUpdated: '6 September 2026',
    sections: [
      {
        heading: '1. Who is responsible for your data',
        paragraphs: [
          `The data controller for this instance is ${OPERATOR_EN}`,
          'For any privacy question or request — including access, rectification, erasure, or the deletion of TikTok data described below — write to ' +
            LEGAL_CONTACT_EMAIL +
            '.',
        ],
      },
      {
        heading: '2. What this service is',
        paragraphs: [
          'Postiz Akorda is not a public SaaS product and does not offer open registration to the general public: access is restricted to authorized users, and the operator may disable public registration entirely. It is used to centrally prepare, schedule, publish and review content on social-media accounts that their owners have expressly authorized.',
          'The application integrates TikTok through TikTok Login Kit (OAuth authorization) and the Content Posting API (uploading, scheduling and publishing videos and photos). It only ever accesses TikTok accounts whose holders have expressly authorized the application via OAuth.',
        ],
      },
      {
        heading: '3. Data the application receives from TikTok',
        paragraphs: [
          'When a TikTok account is connected, TikTok sends the application, via its official API, only the data needed to operate the integration:',
        ],
        list: [
          'Basic profile data of the authorized account as returned by TikTok (account identifier such as open_id / business id, username or display name, profile image, and account statistics where the granted scopes include them).',
          'OAuth access and refresh tokens that allow the application to act on behalf of the authorized account (for example, to publish a scheduled post or refresh analytics).',
          `The list of permissions (scopes) granted by the account holder. Depending on the TikTok integration enabled on this instance, the application requests some or all of the following scopes: ${TIKTOK_SCOPES}.`,
          'Content and metadata strictly necessary to prepare, upload, schedule and publish posts (videos, photos, captions, posting settings such as privacy level or comments preferences, and scheduling information).',
          'Aggregated analytics returned by TikTok for the connected account and its posts (such as views, likes, comments, shares and follower counts), shown inside the application.',
        ],
      },
      {
        heading: '4. Account and technical data',
        paragraphs: [
          'In addition to the TikTok data above, the application stores the data needed to run the private service: name, email address and organization of authorized users; the posts, schedules and settings they create; and basic technical logs (such as IP address, browser type and timestamps) used for security and operation.',
        ],
      },
      {
        heading: '5. Purposes of processing',
        paragraphs: [
          'Personal data is processed exclusively for the following purposes:',
        ],
        list: [
          'Operating the service: authenticating authorized users, storing and organizing their content, and publishing it to the connected TikTok accounts at the scheduled time.',
          'Showing analytics and publishing history for the connected accounts.',
          'Keeping the service secure (detecting abuse, failed logins and incidents) and providing support to authorized users.',
          'Complying with applicable legal obligations.',
        ],
      },
      {
        heading: '6. Legal basis',
        paragraphs: [
          'The legal basis is the express authorization (consent) given by the TikTok account holder when connecting the account through TikTok OAuth, which can be withdrawn at any time as described in section 10; the provision of the service to authorized users; and the legitimate interest of the operator in keeping the service secure.',
        ],
      },
      {
        heading: '7. What we never do with TikTok data',
        paragraphs: [
          'TikTok data is never sold, rented or shared for commercial purposes. It is never used for advertising, for creating profiles of individuals, or for any purpose other than providing the scheduling and publishing service described here.',
        ],
      },
      {
        heading: '8. Where data is stored and who receives it',
        paragraphs: [
          'This instance runs on its own server (Dokploy). Application data, including TikTok OAuth tokens and scheduled content, is stored in the instance PostgreSQL database, and uploaded media is stored on the server own storage volume. Connections to the service use HTTPS. No third-party analytics, advertising or email-marketing providers are enabled on this instance by default.',
          'Data is disclosed only to: TikTok itself, when content is published to, or analytics are requested from, the connected TikTok account (TikTok own policies then apply to data on its platform); the hosting infrastructure strictly necessary to run the server; and public authorities where legally required.',
        ],
      },
      {
        heading: '9. Retention',
        paragraphs: [
          'Account data is kept while the user account is active. TikTok OAuth tokens are kept only while the TikTok integration remains connected or is otherwise still needed to provide the service. When a channel is deleted in Postiz, its access tokens are removed from the database and the channel record is marked as deleted and excluded from any further use. Disconnecting or disabling a channel without deleting it only pauses its use: the stored credentials are kept solely to allow reconnection and are not used for posting. Data is deleted sooner upon a verified erasure request sent to ' +
            LEGAL_CONTACT_EMAIL +
            ', except where the law requires longer retention.',
        ],
      },
      {
        heading: '10. How to revoke TikTok access',
        paragraphs: [
          'You can revoke the application access to your TikTok account at any time, with immediate effect for future posts:',
        ],
        list: [
          'By deleting the TikTok channel inside Postiz Akorda (this removes its access tokens from our database; merely disconnecting or disabling the channel only pauses its use).',
          'Directly in your TikTok app, under settings for authorized third-party applications.',
          'By writing to ' +
            LEGAL_CONTACT_EMAIL +
            ' requesting disconnection and deletion of the associated data.',
        ],
      },
      {
        heading: '11. Your rights',
        paragraphs: [
          'Under the GDPR and the LOPDGDD you have the right to access your data, rectify inaccurate data, request erasure, object to or request restriction of processing, and request portability. To exercise any of these rights, write to ' +
            LEGAL_CONTACT_EMAIL +
            ' indicating your request. If you consider that your rights have not been properly addressed, you may lodge a complaint with the Spanish Data Protection Agency (AEPD, aepd.es).',
        ],
      },
      {
        heading: '12. TikTok policies',
        paragraphs: [
          'TikTok is an independent service with its own rules. Use of TikTok through this application is also governed by the TikTok Terms of Service (https://www.tiktok.com/legal/terms-of-service) and the TikTok Privacy Policy (https://www.tiktok.com/legal/privacy-policy). TikTok acts as an independent controller for the data processed on its own platform.',
        ],
      },
      {
        heading: '13. Changes to this policy',
        paragraphs: [
          'This policy may be updated to reflect changes in the service or in the TikTok integration. The current version is always available at https://postiz.akorda.es/privacy-policy, with its effective and last-updated dates shown at the top.',
        ],
      },
    ],
  },
  es: {
    title: 'Política de privacidad — Postiz Akorda',
    intro:
      'Postiz Akorda (postiz.akorda.es) es una instancia privada y autoalojada de Postiz que se utiliza internamente para administrar, preparar, programar y publicar contenido en las cuentas de redes sociales autorizadas de Akorda y sus proyectos, incluidas cuentas de TikTok conectadas mediante TikTok Login Kit y la Content Posting API. Esta política explica qué datos recibe la aplicación de TikTok y de otras plataformas conectadas, para qué los utiliza y qué derechos tienes conforme al RGPD (Reglamento (UE) 2016/679) y a la LOPDGDD.',
    effectiveLabel: 'Fecha de entrada en vigor',
    effectiveDate: '6 de septiembre de 2026',
    updatedLabel: 'Última actualización',
    lastUpdated: '6 de septiembre de 2026',
    sections: [
      {
        heading: '1. Quién es el responsable de tus datos',
        paragraphs: [
          `El responsable del tratamiento en esta instancia es ${OPERATOR_ES}`,
          'Para cualquier pregunta o solicitud de privacidad —incluidos el acceso, la rectificación, la supresión o la eliminación de los datos de TikTok descritos más abajo— escribe a ' +
            LEGAL_CONTACT_EMAIL +
            '.',
        ],
      },
      {
        heading: '2. Qué es este servicio',
        paragraphs: [
          'Postiz Akorda no es un SaaS público ni ofrece registro abierto al público general: el acceso está restringido a usuarios autorizados y el operador puede desactivar por completo el registro público. Se utiliza para preparar, programar, publicar y revisar de forma centralizada el contenido de cuentas de redes sociales cuyos titulares lo han autorizado expresamente.',
          'La aplicación integra TikTok mediante TikTok Login Kit (autorización OAuth) y la Content Posting API (subida, programación y publicación de vídeos e imágenes). Solo accede a cuentas de TikTok cuyos titulares han autorizado expresamente la aplicación mediante OAuth.',
        ],
      },
      {
        heading: '3. Datos que la aplicación recibe de TikTok',
        paragraphs: [
          'Cuando se conecta una cuenta de TikTok, TikTok envía a la aplicación, a través de su API oficial, únicamente los datos necesarios para operar la integración:',
        ],
        list: [
          'Datos básicos del perfil de la cuenta autorizada tal como los devuelve TikTok (identificador de la cuenta como open_id / business id, nombre de usuario o nombre visible, imagen de perfil y estadísticas de la cuenta cuando los permisos concedidos los incluyen).',
          'Tokens OAuth de acceso y de refresco que permiten a la aplicación actuar en nombre de la cuenta autorizada (por ejemplo, para publicar un contenido programado o actualizar las estadísticas).',
          `La lista de permisos (scopes) concedidos por el titular de la cuenta. Según la integración de TikTok habilitada en esta instancia, la aplicación solicita alguno o todos de los siguientes permisos: ${TIKTOK_SCOPES_ES}.`,
          'Contenido y metadatos estrictamente necesarios para preparar, subir, programar y publicar contenidos (vídeos, imágenes, textos, ajustes de publicación como nivel de privacidad o preferencias de comentarios, e información de programación).',
          'Estadísticas agregadas que devuelve TikTok para la cuenta conectada y sus publicaciones (como visualizaciones, me gusta, comentarios, compartidos y número de seguidores), que se muestran dentro de la aplicación.',
        ],
      },
      {
        heading: '4. Datos de cuenta y datos técnicos',
        paragraphs: [
          'Además de los datos de TikTok anteriores, la aplicación guarda los datos necesarios para prestar el servicio privado: nombre, correo electrónico y organización de los usuarios autorizados; las publicaciones, programaciones y ajustes que crean; y registros técnicos básicos (como dirección IP, tipo de navegador y marcas de tiempo) utilizados para la seguridad y el funcionamiento.',
        ],
      },
      {
        heading: '5. Finalidades del tratamiento',
        paragraphs: [
          'Los datos personales se tratan exclusivamente para las siguientes finalidades:',
        ],
        list: [
          'Prestar el servicio: autenticar a los usuarios autorizados, guardar y organizar su contenido, y publicarlo en las cuentas de TikTok conectadas en el momento programado.',
          'Mostrar estadísticas e historial de publicaciones de las cuentas conectadas.',
          'Mantener la seguridad del servicio (detectar abusos, intentos fallidos de acceso e incidencias) y dar soporte a los usuarios autorizados.',
          'Cumplir las obligaciones legales aplicables.',
        ],
      },
      {
        heading: '6. Base jurídica',
        paragraphs: [
          'La base jurídica es la autorización expresa (consentimiento) otorgada por el titular de la cuenta de TikTok al conectar la cuenta mediante OAuth de TikTok, que puede retirarse en cualquier momento como se describe en el apartado 10; la prestación del servicio a los usuarios autorizados; y el interés legítimo del operador en mantener la seguridad del servicio.',
        ],
      },
      {
        heading: '7. Lo que nunca hacemos con los datos de TikTok',
        paragraphs: [
          'Los datos de TikTok nunca se venden, alquilan ni comparten con fines comerciales. Nunca se utilizan para publicidad, para elaborar perfiles de personas ni para ninguna finalidad distinta de prestar el servicio de programación y publicación aquí descrito.',
        ],
      },
      {
        heading: '8. Dónde se guardan los datos y quién los recibe',
        paragraphs: [
          'Esta instancia se ejecuta en su propio servidor (Dokploy). Los datos de la aplicación, incluidos los tokens OAuth de TikTok y el contenido programado, se guardan en la base de datos PostgreSQL de la instancia, y los archivos subidos se guardan en el volumen de almacenamiento propio del servidor. Las conexiones al servicio utilizan HTTPS. En esta instancia no hay habilitados por defecto proveedores terceros de analítica, publicidad ni marketing por correo.',
          'Los datos solo se comunican a: el propio TikTok, cuando se publica contenido en la cuenta de TikTok conectada o se le solicitan estadísticas (en su plataforma se aplican entonces sus propias políticas); la infraestructura de alojamiento estrictamente necesaria para operar el servidor; y las autoridades públicas cuando la ley lo exija.',
        ],
      },
      {
        heading: '9. Conservación',
        paragraphs: [
          'Los datos de cuenta se conservan mientras la cuenta de usuario esté activa. Los tokens OAuth de TikTok se conservan únicamente mientras la integración con TikTok permanezca conectada o sigan siendo necesarios para prestar el servicio. Cuando un canal se elimina en Postiz, sus tokens de acceso se borran de la base de datos y el registro del canal se marca como eliminado y queda excluido de cualquier uso posterior. Desconectar o desactivar un canal sin eliminarlo solo pausa su uso: las credenciales guardadas se conservan únicamente para permitir la reconexión y no se utilizan para publicar. Los datos se eliminan antes si se recibe una solicitud verificada de supresión en ' +
            LEGAL_CONTACT_EMAIL +
            ', salvo que la ley exija una conservación más prolongada.',
        ],
      },
      {
        heading: '10. Cómo revocar el acceso de TikTok',
        paragraphs: [
          'Puedes revocar el acceso de la aplicación a tu cuenta de TikTok en cualquier momento, con efecto inmediato para futuras publicaciones:',
        ],
        list: [
          'Eliminando el canal de TikTok dentro de Postiz Akorda (esto borra sus tokens de acceso de nuestra base de datos; limitarse a desconectar o desactivar el canal solo pausa su uso).',
          'Directamente en tu aplicación de TikTok, en los ajustes de aplicaciones de terceros autorizadas.',
          'Escribiendo a ' +
            LEGAL_CONTACT_EMAIL +
            ' para solicitar la desconexión y la eliminación de los datos asociados.',
        ],
      },
      {
        heading: '11. Tus derechos',
        paragraphs: [
          'Conforme al RGPD y a la LOPDGDD tienes derecho a acceder a tus datos, rectificar los datos inexactos, solicitar su supresión, oponerte al tratamiento o solicitar su limitación, y solicitar la portabilidad. Para ejercer cualquiera de estos derechos, escribe a ' +
            LEGAL_CONTACT_EMAIL +
            ' indicando tu solicitud. Si consideras que tus derechos no han sido atendidos correctamente, puedes reclamar ante la Agencia Española de Protección de Datos (AEPD, aepd.es).',
        ],
      },
      {
        heading: '12. Políticas de TikTok',
        paragraphs: [
          'TikTok es un servicio independiente con sus propias normas. El uso de TikTok a través de esta aplicación también se rige por las Condiciones del servicio de TikTok (https://www.tiktok.com/legal/terms-of-service) y por la Política de privacidad de TikTok (https://www.tiktok.com/legal/privacy-policy). TikTok actúa como responsable independiente de los datos tratados en su propia plataforma.',
        ],
      },
      {
        heading: '13. Cambios en esta política',
        paragraphs: [
          'Esta política puede actualizarse para reflejar cambios en el servicio o en la integración con TikTok. La versión vigente está siempre disponible en https://postiz.akorda.es/privacy-policy, con sus fechas de entrada en vigor y de última actualización indicadas al inicio.',
        ],
      },
    ],
  },
};

export const termsOfService: Record<LegalLang, LegalDoc> = {
  en: {
    title: 'Terms of Service — Postiz Akorda',
    intro:
      'These terms govern the use of Postiz Akorda (postiz.akorda.es), a private, self-hosted Postiz instance used internally to manage, prepare, schedule and publish content to the authorized social-media accounts of Akorda and its projects, including TikTok accounts connected through TikTok Login Kit and the Content Posting API. By accessing or using this instance you agree to these terms.',
    effectiveLabel: 'Effective date',
    effectiveDate: '6 September 2026',
    updatedLabel: 'Last updated',
    lastUpdated: '6 September 2026',
    sections: [
      {
        heading: '1. Operator of this instance',
        paragraphs: [
          `Postiz Akorda is operated by ${OPERATOR_EN} Contact for any question about these terms: ' + LEGAL_CONTACT_EMAIL + '.`,
          'Postiz Akorda is an independent, self-hosted deployment of the open-source Postiz software. It is not operated by, affiliated with, or endorsed by the Postiz Cloud service, TikTok, or any other social-media platform.',
        ],
      },
      {
        heading: '2. Description of the service and private nature',
        paragraphs: [
          'The service provides tools to prepare, schedule, publish, review and analyze content for social-media accounts whose holders have authorized this instance, as well as media storage and team organization for that purpose.',
          'This is a private, internal instance: it is not a public SaaS product, it does not offer open registration to the general public, and access is restricted to authorized users. The operator may suspend access, disable registration, or discontinue the service at any time.',
        ],
      },
      {
        heading: '3. Authorized accounts only',
        paragraphs: [
          'You may only connect and publish to accounts that you own or that you are expressly authorized to manage. You must not connect third-party accounts without the holder permission, and you must disconnect accounts as soon as your authorization ends.',
        ],
      },
      {
        heading: '4. TikTok and third-party platform rules',
        paragraphs: [
          'Publishing through TikTok is subject to the TikTok Terms of Service (https://www.tiktok.com/legal/terms-of-service), the TikTok Community Guidelines, and any other applicable TikTok policies, as well as to the terms of each other connected platform. You undertake to comply with all of them when using this instance, including rules on branded content, AI-generated content labelling, music use and advertising disclosures.',
        ],
      },
      {
        heading: '5. Responsibility for published content',
        paragraphs: [
          'You are solely responsible for the content you prepare, schedule and publish through this instance, including its legality, accuracy and respect for the rights of third parties. The operator does not pre-moderate content and does not assume ownership of it.',
        ],
      },
      {
        heading: '6. Prohibited content and uses',
        paragraphs: ['The following are prohibited through this instance:'],
        list: [
          'Illegal content, or content that infringes intellectual-property, privacy, image or any other third-party rights.',
          'Misleading, fraudulent, abusive, hateful, harassing or spam content, or any coordinated inauthentic behaviour.',
          'Any use that violates the terms or rate limits of TikTok or of any connected platform, attempts to circumvent their technical restrictions, or exposes the instance integrations to suspension.',
          'Uploading malware or attempting to gain unauthorized access to the service or its infrastructure.',
        ],
      },
      {
        heading: '7. External platforms and availability',
        paragraphs: [
          'TikTok and the other connected platforms are external services: they may change, limit, suspend or discontinue their APIs, change their terms, or suspend accounts at their own discretion. The operator does not guarantee uninterrupted availability of the service or of any integration, nor that a scheduled post will always be accepted or delivered on time by the destination platform.',
        ],
      },
      {
        heading: '8. Liability',
        paragraphs: [
          'To the maximum extent permitted by applicable law, the service is provided "as is". The operator is not liable for damages arising from the unavailability of the service, from decisions or changes made by third-party platforms (including failed or rejected posts, account suspensions or API changes), or from content published by users. Nothing in these terms excludes liability that cannot be excluded under Spanish or EU consumer law where it applies.',
        ],
      },
      {
        heading: '9. Suspension or withdrawal of access',
        paragraphs: [
          'The operator may suspend or withdraw access to the instance, disconnect integrations, or delete content in case of misuse, breach of these terms, breach of a connected platform rules, security risk, or legal requirement.',
        ],
      },
      {
        heading: '10. Intellectual property',
        paragraphs: [
          'Content uploaded or created by users remains the property of its rightsholder. By using the service you grant the operator only the permission strictly necessary to store, process, display and transmit that content in order to provide the service, including sending it to the connected platforms you have selected. The Postiz software itself remains subject to its own open-source licence.',
        ],
      },
      {
        heading: '11. Revocation of the TikTok integration and data deletion',
        paragraphs: [
          'You may revoke the TikTok integration at any time by deleting the TikTok channel inside Postiz Akorda (which removes its access tokens from the database; disconnecting or disabling without deleting only pauses its use), directly in your TikTok app settings for authorized third-party applications, or by writing to ' +
            LEGAL_CONTACT_EMAIL +
            '. When a channel is deleted in Postiz, its access tokens are removed from the database. Data deletion and your privacy rights are described in the Privacy Policy (https://postiz.akorda.es/privacy-policy).',
        ],
      },
      {
        heading: '12. Applicable law and jurisdiction',
        paragraphs: [
          'These terms are governed by Spanish law. Any dispute shall be submitted to the courts and tribunals of Valencia (Spain), unless mandatory consumer-protection rules establish a different jurisdiction.',
        ],
      },
      {
        heading: '13. Contact',
        paragraphs: [`For any question about these terms: ${OPERATOR_EN}`],
      },
      {
        heading: '14. Changes to these terms',
        paragraphs: [
          'These terms may be updated to reflect changes in the service or in the TikTok integration. The current version is always available at https://postiz.akorda.es/terms-of-service, with its effective and last-updated dates shown at the top. Continued use of the instance after an update takes effect constitutes acceptance of the updated terms.',
        ],
      },
    ],
  },
  es: {
    title: 'Condiciones de uso — Postiz Akorda',
    intro:
      'Estas condiciones regulan el uso de Postiz Akorda (postiz.akorda.es), una instancia privada y autoalojada de Postiz que se utiliza internamente para administrar, preparar, programar y publicar contenido en las cuentas de redes sociales autorizadas de Akorda y sus proyectos, incluidas cuentas de TikTok conectadas mediante TikTok Login Kit y la Content Posting API. Al acceder a esta instancia o utilizarla aceptas estas condiciones.',
    effectiveLabel: 'Fecha de entrada en vigor',
    effectiveDate: '6 de septiembre de 2026',
    updatedLabel: 'Última actualización',
    lastUpdated: '6 de septiembre de 2026',
    sections: [
      {
        heading: '1. Operador de esta instancia',
        paragraphs: [
          `Postiz Akorda está operada por ${OPERATOR_ES} Contacto para cualquier pregunta sobre estas condiciones: ' + LEGAL_CONTACT_EMAIL + '.`,
          'Postiz Akorda es un despliegue independiente y autoalojado del software de código abierto Postiz. No está operado por el servicio Postiz Cloud, ni está afiliado a él ni respaldado por él, como tampoco por TikTok ni por ninguna otra plataforma de redes sociales.',
        ],
      },
      {
        heading: '2. Descripción del servicio y carácter privado',
        paragraphs: [
          'El servicio ofrece herramientas para preparar, programar, publicar, revisar y analizar contenido destinado a cuentas de redes sociales cuyos titulares han autorizado esta instancia, así como almacenamiento de archivos y organización del trabajo con esa finalidad.',
          'Se trata de una instancia privada e interna: no es un producto SaaS público, no ofrece registro abierto al público general y el acceso está restringido a usuarios autorizados. El operador puede suspender el acceso, desactivar el registro o interrumpir el servicio en cualquier momento.',
        ],
      },
      {
        heading: '3. Solo cuentas autorizadas',
        paragraphs: [
          'Solo puedes conectar y publicar en cuentas de tu titularidad o que estés expresamente autorizado a gestionar. No debes conectar cuentas de terceros sin el permiso de su titular, y debes desconectar las cuentas en cuanto finalice tu autorización.',
        ],
      },
      {
        heading: '4. Normas de TikTok y de las plataformas de terceros',
        paragraphs: [
          'La publicación a través de TikTok está sujeta a las Condiciones del servicio de TikTok (https://www.tiktok.com/legal/terms-of-service), a las Normas de la comunidad de TikTok y a cualquier otra política aplicable de TikTok, así como a las condiciones de cada otra plataforma conectada. Te comprometes a cumplirlas todas al utilizar esta instancia, incluidas las normas sobre contenido de marca, etiquetado de contenido generado por IA, uso de música e indicación de publicidad.',
        ],
      },
      {
        heading: '5. Responsabilidad sobre el contenido publicado',
        paragraphs: [
          'Eres el único responsable del contenido que prepares, programes y publiques a través de esta instancia, incluida su legalidad, veracidad y respeto a los derechos de terceros. El operador no modera previamente el contenido ni asume su titularidad.',
        ],
      },
      {
        heading: '6. Contenidos y usos prohibidos',
        paragraphs: ['A través de esta instancia están prohibidos:'],
        list: [
          'El contenido ilegal o que infrinja la propiedad intelectual, la privacidad, la propia imagen o cualquier otro derecho de terceros.',
          'El contenido engañoso, fraudulento, abusivo, odioso, acosador o spam, así como cualquier comportamiento inauténtico coordinado.',
          'Cualquier uso que vulnere las condiciones o los límites de uso de TikTok o de otra plataforma conectada, que intente eludir sus restricciones técnicas o que exponga las integraciones de la instancia a una suspensión.',
          'Subir programas maliciosos o intentar acceder sin autorización al servicio o a su infraestructura.',
        ],
      },
      {
        heading: '7. Plataformas externas y disponibilidad',
        paragraphs: [
          'TikTok y las demás plataformas conectadas son servicios externos: pueden modificar, limitar, suspender o interrumpir sus API, cambiar sus condiciones o suspender cuentas según su propio criterio. El operador no garantiza la disponibilidad ininterrumpida del servicio ni de ninguna integración, ni que una publicación programada sea siempre aceptada o entregada a tiempo por la plataforma de destino.',
        ],
      },
      {
        heading: '8. Responsabilidad',
        paragraphs: [
          'En la máxima medida permitida por la ley aplicable, el servicio se presta «tal cual». El operador no responde de los daños derivados de la indisponibilidad del servicio, de las decisiones o cambios de las plataformas de terceros (incluidas publicaciones fallidas o rechazadas, suspensiones de cuentas o cambios en sus API), ni del contenido publicado por los usuarios. Nada de lo dispuesto en estas condiciones excluye la responsabilidad que no pueda excluirse conforme a la normativa española o europea de protección de los consumidores cuando resulte aplicable.',
        ],
      },
      {
        heading: '9. Suspensión o retirada del acceso',
        paragraphs: [
          'El operador puede suspender o retirar el acceso a la instancia, desconectar integraciones o eliminar contenido en caso de uso indebido, incumplimiento de estas condiciones, incumplimiento de las normas de una plataforma conectada, riesgo para la seguridad o exigencia legal.',
        ],
      },
      {
        heading: '10. Propiedad intelectual',
        paragraphs: [
          'El contenido subido o creado por los usuarios sigue perteneciendo a su titular. Al utilizar el servicio concedes al operador únicamente el permiso estrictamente necesario para almacenar, procesar, mostrar y transmitir ese contenido con el fin de prestar el servicio, incluido su envío a las plataformas conectadas que hayas seleccionado. El software Postiz en sí sigue sujeto a su propia licencia de código abierto.',
        ],
      },
      {
        heading:
          '11. Revocación de la integración con TikTok y eliminación de datos',
        paragraphs: [
          'Puedes revocar la integración con TikTok en cualquier momento eliminando el canal de TikTok dentro de Postiz Akorda (lo que borra sus tokens de acceso de la base de datos; desconectar o desactivar sin eliminar solo pausa su uso), directamente en los ajustes de tu aplicación de TikTok para aplicaciones de terceros autorizadas, o escribiendo a ' +
            LEGAL_CONTACT_EMAIL +
            '. Cuando un canal se elimina en Postiz, sus tokens de acceso se borran de la base de datos. La eliminación de datos y tus derechos de privacidad se describen en la Política de privacidad (https://postiz.akorda.es/privacy-policy).',
        ],
      },
      {
        heading: '12. Legislación aplicable y jurisdicción',
        paragraphs: [
          'Estas condiciones se rigen por la legislación española. Cualquier controversia se someterá a los juzgados y tribunales de Valencia (España), salvo que la normativa imperativa de protección de los consumidores establezca otra jurisdicción.',
        ],
      },
      {
        heading: '13. Contacto',
        paragraphs: [
          `Para cualquier pregunta sobre estas condiciones: ${OPERATOR_ES}`,
        ],
      },
      {
        heading: '14. Cambios en estas condiciones',
        paragraphs: [
          'Estas condiciones pueden actualizarse para reflejar cambios en el servicio o en la integración con TikTok. La versión vigente está siempre disponible en https://postiz.akorda.es/terms-of-service, con sus fechas de entrada en vigor y de última actualización indicadas al inicio. El uso continuado de la instancia después de que una actualización entre en vigor constituye la aceptación de las condiciones actualizadas.',
        ],
      },
    ],
  },
};
