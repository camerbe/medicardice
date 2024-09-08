<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AppointmentConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $name;
    protected $appointment_date;
    protected $appointment_hour;
    /**
     * Create a new message instance.
     */
    public function __construct(protected $nom,protected $date_rdv,$heure_rdv)
    {
        //
        $this->name=$nom;
        $this->appointment_date=$date_rdv;
        $this->appointment_hour=$heure_rdv;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Confirmation du rendez-vous",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.rdv',
            with: [
                'date_rdv' => $this->appointment_date,
                'heure_rdv' => $this->appointment_hour,
                'name' => $this->name,

            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
