"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ScheduleTable({ weeks, teams }: { weeks: any[][], teams: any[] }) {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null); // Default to null (all weeks)
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null); // Default to null (all teams)
  
  const handleWeekSelection = (weekIndex: number | null) => {
    setSelectedWeek(weekIndex);
  };

  const getMatchesForSelectedWeek = () => {
    if (selectedWeek === null) {
      return weeks.flat(); // All matches
    } else {
      return weeks[selectedWeek];
    }
  };

  const getMatchesforAll = () => {
    return weeks;
  };

  const startDate = new Date("2024-09-22T11:00:00-04:00");

  return (
    <div>
      <Label htmlFor="week-type">Select Week To View</Label>
      <Select
        onValueChange={(value) =>
          handleWeekSelection(value === "all" ? null : Number(value))
        } 
      >
        <SelectTrigger id="week-type">
          <SelectValue placeholder="Select Week" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Weeks</SelectItem>
          {weeks.map((_, weekIndex) => (
            <SelectItem key={weekIndex} value={weekIndex.toString()}>
              Week {weekIndex + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label htmlFor="team-select">Select Team To View</Label>
      <Select
        onValueChange={(value) =>
          setSelectedTeam(value === "all" ? null : value)
        }
      >
        <SelectTrigger id="team-select">
          <SelectValue placeholder="Select Team" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Teams</SelectItem>
          {teams.map((teamName) => (
            <SelectItem key={teamName} value={teamName}>
              {teamName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <br></br>

      {selectedWeek !== null && (
        <h2>
          {selectedWeek === null ? "All Weeks" : `Week ${selectedWeek + 1}`}
        </h2>
      )}

      {selectedWeek === null
        ? getMatchesforAll().map((weekMatches, weekIndex) => {
            // Compute the date for the current week
            const weekDate = new Date(startDate);
            weekDate.setDate(weekDate.getDate() + weekIndex * 7);

            // Apply team filter to weekMatches
            const filteredWeekMatches =
              selectedTeam !== null
                ? weekMatches.filter(
                    (match) =>
                      match.teamOne === selectedTeam ||
                      match.teamTwo === selectedTeam
                  )
                : weekMatches;

            return (
              <div key={weekIndex}>
                <h2>
                  Week {weekIndex + 1} - ({weekDate.toDateString()})
                </h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team 1</TableHead>
                      <TableHead>Team 2</TableHead>
                      <TableHead>Team 1 Score</TableHead>
                      <TableHead>Team 2 Score</TableHead>
                      <TableHead>Date (DD/MM/YYYY)</TableHead>
                      <TableHead>Kick Off Time</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredWeekMatches.length > 0 ? (
                      filteredWeekMatches.map((item, idx) => (
                        <TableRow key={`${weekIndex}-${idx}`}>
                          <TableCell>{item.teamOne}</TableCell>
                          <TableCell>{item.teamTwo}</TableCell>
                          <TableCell>{item.scoreOne}</TableCell>
                          <TableCell>{item.scoreTwo}</TableCell>
                          <TableCell>
                            {item.kickOffTime.toLocaleDateString("en-GB")}
                          </TableCell>
                          <TableCell>
                            {item.kickOffTime.toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </TableCell>
                          <TableCell>{item.location}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7}>
                          No matches for selected team this week
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <br></br>
              </div>
            );
          })
        : (() => {
            const weekDate = new Date(startDate);
            weekDate.setDate(weekDate.getDate() + selectedWeek * 7);

            const filteredMatches = getMatchesForSelectedWeek().filter(
              (match) =>
                selectedTeam === null ||
                match.teamOne === selectedTeam ||
                match.teamTwo === selectedTeam
            );

            return (
              <div>
                <h2>
                  Week {selectedWeek + 1} - ({weekDate.toDateString()})
                </h2>
                <Table>
                <TableHeader>
                    <TableRow>
                      <TableHead>Team 1</TableHead>
                      <TableHead>Team 2</TableHead>
                      <TableHead>Team 1 Score</TableHead>
                      <TableHead>Team 2 Score</TableHead>
                      <TableHead>Date (DD/MM/YYYY)</TableHead>
                      <TableHead>Kick Off Time</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMatches.length > 0 ? (
                      filteredMatches.map((item, idx) => (
                        <TableRow key={`${selectedWeek}-${idx}`}>
                          <TableCell>{item.teamOne}</TableCell>
                          <TableCell>{item.teamTwo}</TableCell>
                          <TableCell>{item.scoreOne}</TableCell>
                          <TableCell>{item.scoreTwo}</TableCell>
                          <TableCell>
                            {item.kickOffTime.toLocaleDateString("en-GB")}
                          </TableCell>
                          <TableCell>
                            {item.kickOffTime.toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </TableCell>
                          <TableCell>{item.location}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7}>
                          No matches for selected team this week
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            );
          })()}
    </div>
  );
}
