import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DeviceRequestModal({ request, onAction }:any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">View</Button>
      </DialogTrigger>

      <DialogContent className="p-6 rounded-md w-full max-w-lg shadow-lg bg-white">
        <h3 className="text-xl font-semibold mb-4">Device Request Details</h3>

        {/* Request Details */}
        <div className="space-y-2">
          <p><strong>Requester:</strong> {request.requester}</p>
          <p><strong>Branch:</strong> {request.branch}</p>
          <p><strong>Device ID:</strong> {request.deviceId}</p>
          <p><strong>Reason:</strong> {request.reason}</p>
          <p><strong>Status:</strong> {request.status}</p>
        </div>

        {/* Approve / Deny Buttons */}
        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => onAction(request.id, "approved")}
          >
            Approve
          </Button>
          <Button
            variant="destructive"
            onClick={() => onAction(request.id, "denied")}
          >
            Deny
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
