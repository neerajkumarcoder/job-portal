import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

function AppliedJobTable() {
    const {allAppliedJobs} = useSelector(store=>store.job);
  return (
    <div className="overflow-x-auto w-full">
        <Table className="min-w-150 w-full md:min-w-0 md:table-fixed">
            <TableCaption className="text-base md:text-lg">A List of your Applied Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="min-w-25 text-xs px-2 py-2 md:px-4 md:py-3">Date</TableHead>
                    <TableHead className="min-w-25 text-xs px-2 py-2 md:px-4 md:py-3">Job Role</TableHead>
                    <TableHead className="min-w-25 text-xs px-2 py-2 md:px-4 md:py-3">Company</TableHead>
                    <TableHead className="min-w-25 text-xs px-2 py-2 md:px-4 md:py-3 text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    allAppliedJobs?.length == 0 ? 
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-4">You haven't applied any job yet.</TableCell>
                        </TableRow>
                    : allAppliedJobs?.map((appliedJob,index)=>(
                        <TableRow key={appliedJob._id} className="text-sm md:text-base">
                            <TableCell className="px-2 py-2 md:px-4 md:py-3">{appliedJob.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="px-2 py-2 md:px-4 md:py-3">{appliedJob.job?.title}</TableCell>
                            <TableCell className="px-2 py-2 md:px-4 md:py-3">{appliedJob.job?.company?.name}</TableCell>
                            <TableCell className="px-2 py-2 md:px-4 md:py-3 text-right">
                                <Badge className={`${appliedJob.status === 'rejected' ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'} text-xs md:text-sm`}>
                                    {appliedJob?.status.toUpperCase()}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable