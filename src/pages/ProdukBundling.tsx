import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonButton } from '@ionic/react';

const ProdukBundling: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Produk Bundling</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Produk Bundling</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* Example content */}
        <div style={{ padding: '20px' }}>
          <IonText>
            <h2>Welcome to the Produk Bundling Page!</h2>
            <p>This is where you can add your product details, information, or any other content.</p>
          </IonText>
          <IonButton expand="full" onClick={() => alert('Button Clicked!')}>Click Me</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProdukBundling;

