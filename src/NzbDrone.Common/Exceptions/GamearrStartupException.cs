using System;

namespace NzbDrone.Common.Exceptions
{
    public class GamearrStartupException : NzbDroneException
    {
        public GamearrStartupException(string message, params object[] args)
            : base("Gamearr failed to start: " + string.Format(message, args))
        {

        }

        public GamearrStartupException(string message)
            : base("Gamearr failed to start: " + message)
        {

        }

        public GamearrStartupException()
            : base("Gamearr failed to start")
        {

        }

        public GamearrStartupException(Exception innerException, string message, params object[] args)
            : base("Gamearr failed to start: " + string.Format(message, args), innerException)
        {
        }

        public GamearrStartupException(Exception innerException, string message)
            : base("Gamearr failed to start: " + message, innerException)
        {
        }

        public GamearrStartupException(Exception innerException)
            : base("Gamearr failed to start: " + innerException.Message)
        {

        }
    }
}
