from rest_framework import serializers

from routechoices.core.models import Club, Event


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        Model = Club
        fields = ["slug", "name"]


class EventSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    club = serializers.ClubSerializer()
    club_slug = serializers.CharField(
        source="club__slug", write_only=True
    )  # should not be editable after creation, ensure in validation step

    class Meta:
        model = Event
        fields = [
            "id",
            "name",
            "slug",
            "club",
            "club_slug",
            "start_date",
            "end_date",
            "privacy",
            "backdrop",
            "open_registration",
            "open_route_upload",
            "url",
        ]
        read_only_fields = ["id", "club", "url"]

    def validate(self, data):
        pass
