package ro.uTech.security.exception;

public class FailedAuditTrailException extends Exception {

    public FailedAuditTrailException(Throwable cause) {
        super("Failed to save audit trail because of: ", cause);
    }
}