from user_sessions.backends.db import SessionStore as OrigSessionStore


class SessionStore(OrigSessionStore):
    def _get_session_from_db(self):
        s = super(OrigSessionStore, self)._get_session_from_db()
        if s:
            self.user_id = s.user_id
            # do not overwrite user_agent/ip, as those might have been updated
            if self.user_agent != s.user_agent or self.ip != s.ip:
                self.modified = True
            return s
