import NotificationBell from './NotificationBell';

export default function Layout({ children }) {
  return (
    <div>
      <header>
        {/* ... other header content ... */}
        <NotificationBell />
      </header>
      <main>{children}</main>
    </div>
  );
}