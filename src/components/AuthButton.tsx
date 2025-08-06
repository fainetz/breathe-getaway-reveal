import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { User, LogOut } from "lucide-react";

const AuthButton = () => {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return <div className="w-20 h-10 bg-muted animate-pulse rounded-md" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          {user.email}
        </div>
        <Button variant="outline" size="sm" onClick={signOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button asChild variant="outline" size="sm">
      <Link to="/auth">Sign In</Link>
    </Button>
  );
};

export default AuthButton;