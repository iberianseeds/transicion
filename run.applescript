#!/usr/bin/osascript

tell application "iTerm"
    activate

    set W to (create window with default profile)

    tell W's current session
        split vertically with default profile
    end tell
    set T to W's current tab
    write T's session 1 text "cd /Users/jordiroca/DEV20/www/acmejrm/csstransitions/transita && php -S localhost:8888"
    write T's session 2 text "cd /Users/jordiroca/DEV20/www/acmejrm/csstransitions/transita && sass -w scss:css"
end tell
