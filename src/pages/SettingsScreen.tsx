import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Link2, Bell, Moon, Shield, LogOut, ChevronRight, Camera, UserPlus, X } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import GlassModal from '@/components/GlassModal';
import { Switch } from '@/components/ui/switch';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  linkedPartner: string;
}

const SettingsScreen = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Usuário',
    email: 'usuario@email.com',
    phone: '(11) 99999-9999',
    avatar: '',
    linkedPartner: '',
  });

  const [editModal, setEditModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [partnerEmail, setPartnerEmail] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [editField, setEditField] = useState<'name' | 'email' | 'phone' | null>(null);
  const [editValue, setEditValue] = useState('');

  const openEditField = (field: 'name' | 'email' | 'phone') => {
    setEditField(field);
    setEditValue(profile[field]);
    setEditModal(true);
  };

  const saveField = () => {
    if (editField) {
      setProfile(prev => ({ ...prev, [editField]: editValue }));
    }
    setEditModal(false);
    setEditField(null);
  };

  const linkPartner = () => {
    if (partnerEmail.trim()) {
      setProfile(prev => ({ ...prev, linkedPartner: partnerEmail.trim() }));
      setPartnerEmail('');
      setLinkModal(false);
    }
  };

  const unlinkPartner = () => {
    setProfile(prev => ({ ...prev, linkedPartner: '' }));
  };

  const fieldLabels: Record<string, string> = {
    name: 'Nome',
    email: 'E-mail',
    phone: 'Telefone',
  };

  const menuItem = (
    icon: React.ReactNode,
    label: string,
    value?: string | React.ReactNode,
    onClick?: () => void,
    destructive?: boolean
  ) => (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-card hover:bg-accent/50 transition-colors"
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${destructive ? 'bg-destructive/10' : 'bg-primary/10'}`}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <span className={`text-sm font-medium ${destructive ? 'text-destructive' : 'text-foreground'}`}>{label}</span>
      </div>
      {typeof value === 'string' ? (
        <span className="text-xs text-muted-foreground mr-1">{value}</span>
      ) : value}
      {onClick && !destructive && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-background pb-8">
      <PageHeader title="Configurações" subtitle="Gerencie seu perfil e preferências" />

      {/* Avatar Section */}
      <div className="flex flex-col items-center mt-2 mb-6">
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg"
        >
          {profile.avatar ? (
            <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          ) : (
            <User className="w-10 h-10 text-primary-foreground" />
          )}
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-card border-2 border-background flex items-center justify-center shadow-md">
            <Camera className="w-4 h-4 text-muted-foreground" />
          </div>
        </motion.div>
        <h2 className="text-lg font-bold text-foreground mt-3">{profile.name}</h2>
        <p className="text-sm text-muted-foreground">{profile.email}</p>
      </div>

      {/* Profile Section */}
      <div className="px-5 space-y-2 mb-6">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">Perfil</p>
        {menuItem(
          <User className="w-4 h-4 text-primary" />,
          'Nome',
          profile.name,
          () => openEditField('name')
        )}
        {menuItem(
          <Mail className="w-4 h-4 text-primary" />,
          'E-mail',
          profile.email,
          () => openEditField('email')
        )}
        {menuItem(
          <Phone className="w-4 h-4 text-primary" />,
          'Telefone',
          profile.phone,
          () => openEditField('phone')
        )}
      </div>

      {/* Link Partner Section */}
      <div className="px-5 space-y-2 mb-6">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">Conta Vinculada</p>
        {profile.linkedPartner ? (
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-card">
            <div className="w-9 h-9 rounded-xl bg-success/10 flex items-center justify-center">
              <Link2 className="w-4 h-4 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Vinculado a</p>
              <p className="text-xs text-muted-foreground">{profile.linkedPartner}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={unlinkPartner}
              className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-destructive" />
            </motion.button>
          </div>
        ) : (
          menuItem(
            <UserPlus className="w-4 h-4 text-primary" />,
            'Vincular parceiro(a)',
            'Compartilhar finanças',
            () => setLinkModal(true)
          )
        )}
      </div>

      {/* Preferences Section */}
      <div className="px-5 space-y-2 mb-6">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">Preferências</p>
        {menuItem(
          <Bell className="w-4 h-4 text-primary" />,
          'Notificações',
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        )}
        {menuItem(
          <Moon className="w-4 h-4 text-primary" />,
          'Modo escuro',
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        )}
      </div>

      {/* Security Section */}
      <div className="px-5 space-y-2 mb-6">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">Segurança</p>
        {menuItem(
          <Shield className="w-4 h-4 text-primary" />,
          'Alterar senha',
          undefined,
          () => {}
        )}
        {menuItem(
          <LogOut className="w-4 h-4 text-destructive" />,
          'Sair da conta',
          undefined,
          () => {},
          true
        )}
      </div>

      {/* Edit Field Modal */}
      <GlassModal isOpen={editModal} onClose={() => setEditModal(false)} title={`Editar ${editField ? fieldLabels[editField] : ''}`}>
        <div className="space-y-4">
          <input
            type={editField === 'email' ? 'email' : editField === 'phone' ? 'tel' : 'text'}
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder={editField ? fieldLabels[editField] : ''}
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={saveField}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
          >
            Salvar
          </motion.button>
        </div>
      </GlassModal>

      {/* Link Partner Modal */}
      <GlassModal isOpen={linkModal} onClose={() => setLinkModal(false)} title="Vincular Parceiro(a)">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Insira o e-mail do parceiro(a) para compartilhar e gerenciar as finanças juntos.
          </p>
          <input
            type="email"
            value={partnerEmail}
            onChange={e => setPartnerEmail(e.target.value)}
            placeholder="email@parceiro.com"
            className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={linkPartner}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
          >
            Vincular
          </motion.button>
        </div>
      </GlassModal>
    </div>
  );
};

export default SettingsScreen;
