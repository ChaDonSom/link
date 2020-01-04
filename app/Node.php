<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Node extends Model
{
	protected $fillable = [
		'content',
		'title',
        'slug',
        'created_by',
	];

	public function lefts()  { return $this->belongsToMany('App\Node', 'node_node', 'right_ref', 'left_ref'  ); }
    public function rights() { return $this->belongsToMany('App\Node', 'node_node', 'left_ref',  'right_ref' ); }
    
    public function creator() { return $this->belongsTo('App\User', 'created_by'); }

    public function users()   { return $this->belongsToMany('App\User'); }
}
