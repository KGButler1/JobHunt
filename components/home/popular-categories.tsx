"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  CodeIcon,
  PenToolIcon,
  BarChartIcon,
  ShieldIcon,
  SmartphoneIcon,
  DatabaseIcon,
  BriefcaseIcon
} from "lucide-react";

const categories = [
  {
    icon: CodeIcon,
    name: "Software Development",
    count: 1234,
    color: "text-blue-500"
  },
  {
    icon: PenToolIcon,
    name: "Design",
    count: 567,
    color: "text-purple-500"
  },
  {
    icon: BarChartIcon,
    name: "Marketing",
    count: 890,
    color: "text-green-500"
  },
  {
    icon: ShieldIcon,
    name: "Cybersecurity",
    count: 345,
    color: "text-red-500"
  },
  {
    icon: SmartphoneIcon,
    name: "Mobile Development",
    count: 678,
    color: "text-orange-500"
  },
  {
    icon: DatabaseIcon,
    name: "Data Science",
    count: 432,
    color: "text-teal-500"
  }
];

export default function PopularCategories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <BriefcaseIcon className="h-5 w-5" />
          Popular Categories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                  <div className={`p-2 rounded-lg bg-muted group-hover:bg-background transition-colors`}>
                    <Icon className={`h-5 w-5 ${category.color}`} />
                  </div>
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {category.count.toLocaleString()} jobs
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}