export interface Orders {
    id?: string;
    produits: { id: string; quantite: number; }[]; // Liste de produits avec quantité
    client: { nom: string; email: string; adresse: string };
    total: number;
    date: Date;
    statut?: string; // Ex : "En cours", "Livrée", etc.
    userId: string;
}
