interface Menu {
  url: string;
  icon: string;
  title: string;
}

export const menu: Menu[] = [
  { url: '/contacts', icon: 'contacts', title: 'Contacts' },
  { url: '/import-contacts', icon: 'cloud-upload', title: 'Import Contacts' }
];
