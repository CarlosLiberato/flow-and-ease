import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

const PageHeader = ({ title, subtitle, rightAction }: PageHeaderProps) => {
  return (
    <motion.div
      className="flex items-center justify-between px-5 pt-14 pb-4 safe-top"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {rightAction}
    </motion.div>
  );
};

export default PageHeader;
