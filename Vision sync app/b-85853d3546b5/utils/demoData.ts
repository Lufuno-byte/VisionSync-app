
export const createDemoOrders = () => [
  {
    id: '1',
    orderNumber: 'ORD-2025-001',
    type: 'glasses' as const,
    status: 'processing' as const,
    orderDate: '2025-10-15',
    estimatedCompletion: '2025-10-22',
    branch: 'Pretoria CBD',
    description: 'Progressive lenses with anti-glare coating',
    progress: 60,
  },
  {
    id: '2',
    orderNumber: 'ORD-2025-002',
    type: 'sunglasses' as const,
    status: 'ready' as const,
    orderDate: '2025-08-10',
    estimatedCompletion: '2025-08-18',
    branch: 'Sunnyside',
    description: 'Prescription sunglasses with UV protection',
    progress: 100,
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-045',
    type: 'contact_lenses' as const,
    status: 'completed' as const,
    orderDate: '2024-12-20',
    estimatedCompletion: '2024-12-22',
    branch: 'Pretoria CBD',
    description: 'Monthly contact lenses (6 months supply)',
    progress: 100,
  },
];

export const createDemoUser = () => ({
  id: 'demo-user',
  email: 'demo@visionSync.com',
  firstName: 'Demo',
  lastName: 'User',
  phone: '+27 12 345 6789',
});
