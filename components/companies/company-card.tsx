import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon, BriefcaseIcon, TrendingUpIcon } from "lucide-react";

interface CompanyCardProps {
  company: {
    id: number;
    name: string;
    logo: string;
    industry: string;
    location: string;
    size: string;
    description: string;
    openPositions: number;
    rating: number;
  };
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={company.logo}
            alt={company.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{company.name}</h3>
            <Badge variant="secondary">{company.industry}</Badge>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {company.description}
          </p>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPinIcon className="h-4 w-4" />
              {company.location}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <BriefcaseIcon className="h-4 w-4" />
              {company.size}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <TrendingUpIcon className="h-4 w-4" />
              {company.openPositions} open positions
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              ★ {company.rating.toFixed(1)}
            </div>
          </div>

          <Button className="w-full">View Company</Button>
        </div>
      </div>
    </Card>
  );
}